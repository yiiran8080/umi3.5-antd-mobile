import React, { useState, useEffect } from 'react'
import { connect } from 'dva';
import { Card, InfiniteScroll, List, SearchBar, Button, Popup, Form, Input, Selector, Toast, Picker, Space } from 'antd-mobile'
import {
    FilterOutline,
    CloseCircleFill
} from 'antd-mobile-icons'
import styles from './styles.less'
import { errorInfo } from "@/utils/messagebox";
const modelName = 'WorkflowModel';
const pageSize = 10;

const FilterForm = (props) => {
    const { visible, setVisible, formValues, setFormValues, doSearch} = props;
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({ ...formValues });
    }, [formValues])
    const onFinish = (values) => {
        let newFormValues = { ...values };
        console.log('vv', newFormValues)
        setFormValues(newFormValues);
        doSearch(newFormValues);
    }
    const onReset = () => {
        form.resetFields();
        setFormValues({});
    }

    return <Popup
        visible={visible}
        onMaskClick={() => {
            setVisible(false)
        }}
        position='right'
        bodyStyle={{ width: '80vw' }}
    >
        <Form
            className={styles.filterForm}
            form={form}
            onFinish={onFinish}
            layout='horizontal'
            footer={
                <div style={{ display: 'flex' }}>
                    <Button type='submit' color='primary' style={{ width: '50%' }}>
                        查询
                    </Button>
                    <Button color='default' style={{ width: '50%' }} onClick={onReset}>
                        重置
                    </Button>
                </div>

            }
        >
            <Form.Header>全部条件</Form.Header>
            <Form.Item
                name='title'
                label='流程标题'
            >
                <Input placeholder='请输入' />
            </Form.Item>
        </Form>
    </Popup>
}
function TaskTodoQuery(props) {
    const { dispatch, location: { onHandlePage } } = props;
    const [data, setData] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [formValues, setFormValues] = useState({ });
    const [pageNo, setPageNo] = useState(1);
    const [visible, setVisible] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    useEffect(() => {
        refresh();
    }, [])
    useEffect(() => {
        setSearchValue(formValues.title || '')
    }, [formValues])
    async function loadMore() {
        console.log('loadMore_pageNo', pageNo)
        // const append = await mockRequest()
        try {
            const append = await handleSearch(pageNo + 1);
            setPageNo(pageNo + 1);
            setData(val => [...val, ...append])
            setHasMore(append.length > 0)
        } catch (e) {

        }
    }
    async function refresh(fieldsValue = {}) {
        setPageNo(1);
        try {
            const append = await handleSearch(1, fieldsValue);
            setData(val => [...val, ...append])
            setHasMore(append.length > 0)
        } catch (e) {

        }
    }
    const handleSearch = (pageNo, fieldsValue = {}) => {
        return new Promise((resolve, reject) => {
            dispatch({
                type: `${modelName}/taskTodoQuery`,
                payload: {
                    ...formValues,
                    ...fieldsValue,
                    pageNo,
                    pageSize,
                },
                callback: response => {
                    if (response && response.status == 0) {
                        resolve(response.data.dataContent);
                    } else {
                        reject();
                    }
                },
            });
        })
    }

    const onTitleChange = (value) => {
        setSearchValue(value);
    }
    //表单查询
    function doSearch(values = {}) {
        setVisible(false);
        setData([])
        setHasMore(true)
        refresh(values);
    }
    //搜索框
    const onSearch = () => {
        let newValues = { ...formValues, title: searchValue };
        setFormValues(newValues);
        setData([])
        setHasMore(true)
        refresh(newValues);
    }

    return (
        <Card>
            <div className={styles.header}>
                <div className={styles.left}>
                    <SearchBar placeholder='请输入流程标题' onChange={onTitleChange} value={searchValue} />
                </div>
                <div className={styles.right}>
                    <Button size='small' color='primary' onClick={onSearch}>
                        搜索
                    </Button>
                </div>
                <FilterOutline fontSize={24} style={{ marginLeft: '8px' }} onClick={() => { setVisible(true) }} />
            </div>
            <div className={styles.list}>
                <List>
                    {data.map((item, index) => (
                        <List.Item key={item.id}>
                            <div>
                                <a
                                    onClick={()=>{}}
                                >
                                    具体内容
                                </a>
                            </div>
                        </List.Item>
                    ))}
                </List>
            </div>

            <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
            <FilterForm
                visible={visible}
                setVisible={setVisible}
                formValues={formValues}
                setFormValues={setFormValues}
                doSearch={doSearch}
                dictData={dictData}
            />
        </Card>
    )
}

export default connect(({ WorkflowModel, loading }) => ({
    WorkflowModel,
    loading: loading.models.WorkflowModel,
}))(TaskTodoQuery)