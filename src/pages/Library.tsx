import React, { useEffect, useState } from 'react'
import { Col, List, Row, Tree, Card, Button } from 'antd'
import { LikeOutlined, StarOutlined } from '@ant-design/icons';
import type { DataNode } from 'antd/es/tree';
import { getFamilyCategoryFetch, getFamilyPageByKeyword } from '../services/family'
import { Family } from "../models/family";
import Item from 'antd/lib/list/Item';
const { Meta } = Card;

function mockdatas() {
    const families: Family[] = [];
    for (let index = 0; index < 30; index++) {
        var family: Family = {
            id: index,
            uploader: "1",
            name: `family ${index}`,
            createTime: Date.now().toString(),
            updateTime: Date.now().toString(),
            version: 2020,
            fileId: `file ${index}`,
            category: undefined
        }
        families.push(family);
    }
    return families;
}

function Library() {
    const [treeDatas, setTreeDatas] = useState<DataNode[]>([]);
    const [families, setFamilies] = useState<Family[]>([]);
    const [pageIndex, setPageIndex] = useState<number>(1);

    async function getFamilyCategories() {
        var httpResponse = await getFamilyCategoryFetch();
        if (httpResponse.success) {
            var familyCategories = httpResponse.response;
            setTreeDatas(familyCategories)
        }
    }

    async function getFamilyPage(keyword: string | undefined, pageIndex: number, pageSize: number) {
        var httpResponse = await getFamilyPageByKeyword(keyword, pageIndex, pageSize);
        if (httpResponse.success) {
            var familyPage = httpResponse.response;
            setFamilies(familyPage.data);
            setPageIndex(familyPage.page)
        }
    }


    useEffect(() => {
        getFamilyCategories();
        //getFamilyPage(undefined, pageIndex, 30);
        var _families = mockdatas();
        setFamilies(_families);
    }, [])
    return (
        <div style={{ height: "1000px", padding: "40px 100px" }}>
            <Row>
                <Col span={6}>
                    <Tree
                        showLine={true}
                        treeData={treeDatas}
                        onSelect={(keys, info) => {
                            console.log(info)
                        }}
                    />
                </Col>
                <Col span={1} />
                <Col span={17}>
                    <List
                        style={{ height: "1000px" }}
                        itemLayout='horizontal'
                        dataSource={families}
                        grid={{
                            column: 5,
                            gutter: 16,
                            xs: 2,
                            sm: 3,
                            xxl: 5
                        }}
                        pagination={
                            {
                                current: pageIndex
                            }
                        }
                        renderItem={(item) =>
                        (
                            <List.Item key={item.id}>
                                <Card
                                    hoverable
                                    style={{ width: 200, height: 200 }}
                                >
                                    <Meta title={item.name} description="www.instagram.com" />
                                </Card>
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default Library