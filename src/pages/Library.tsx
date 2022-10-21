import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { Col, List, Row, Tree, Card, Button, Image } from 'antd'
import { LikeOutlined, StarOutlined, DownloadOutlined } from '@ant-design/icons';
import type { DataNode } from 'antd/es/tree';
import { getFamilyCategoryFetch, getFamilyPageByKeywordFetch, getFamilyPageByCategoryFetch, getFamilyFileUrlFetch } from '../services/family'
import { Family } from "../models/family";
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
            imageUrl: "1",
            fileId: `file ${index}`,
            category: undefined
        }
        families.push(family);
    }
    return families;
}

function Library() {
    const navigate = useNavigate();
    const [treeDatas, setTreeDatas] = useState<DataNode[]>([]);
    const [families, setFamilies] = useState<Family[]>([]);
    const [pageIndex, setPageIndex] = useState<number>(1);
    async function getFamilyCategories() {
        let httpResponse = await getFamilyCategoryFetch();
        if (httpResponse.success) {
            var familyCategories = httpResponse.response;
            setTreeDatas(familyCategories)
        }
    }

    async function getFamilyPageByKeyword(keyword: string | undefined, pageIndex: number, pageSize: number) {
        let httpResponse = await getFamilyPageByKeywordFetch(keyword, pageIndex, pageSize);
        if (httpResponse.success) {
            var familyPage = httpResponse.response;
            setFamilies(familyPage.data);
            setPageIndex(familyPage.page)
        }
    }

    async function getFamilyPageByCategory(categoryId: number | 0, pageIndex: number, pageSize: number) {
        let httpResponse = await getFamilyPageByCategoryFetch(categoryId, pageIndex, pageSize);
        if (httpResponse.success) {
            var familyPage = httpResponse.response;
            setFamilies(familyPage.data);
        }
    }

    async function getFamilyImage(fileKey: string) {
        let httpResponse = await getFamilyFileUrlFetch(fileKey);
        if (httpResponse.success) {
            var url = httpResponse.response;
            return url;
        }
    }

    useEffect(() => {
        getFamilyCategories();
        getFamilyPageByKeyword(undefined, pageIndex, 30);
        // var _families = mockdatas();
        // setFamilies(_families);
    }, [pageIndex])
    return (
        <div style={{ minHeight: "1000px", padding: "40px 100px" }}>
            <Row>
                <Col span={3}>
                    <Tree
                        showLine={true}
                        treeData={treeDatas}
                        onSelect={(key) => {

                        }}
                    />
                </Col>
                <Col span={1} />
                <Col span={20}>
                    <List
                        style={{ minHeight: "1000px", width: "1200px" }}
                        itemLayout='horizontal'
                        dataSource={families}
                        split
                        rowKey={(family) => family.id}
                        grid={{
                            gutter: 20,
                            column: 5
                        }}
                        pagination={
                            {
                                current: pageIndex,
                                pageSize: 30,
                                pageSizeOptions: [30],
                                onChange(page) {
                                    setPageIndex(page);
                                },
                            }
                        }
                        renderItem={(family) =>
                        (
                            <List.Item onClick={(event) => {
                                console.log(event);
                                // navigate('family', {

                                // })
                            }}>
                                {/* <div style={{ width: "220px", height: "280px" }}>
                                    <div>
                                        <Image
                                            width={220}
                                            height={220}
                                            preview={false}
                                            alt={family.name}
                                            src={family.imageUrl} />
                                    </div>
                                    <div style={{ height: "30px" }}>

                                    </div>
                                    <div>
                                        {family.name}
                                    </div>
                                </div> */}
                                <Card style={{ width: "220px", height: "280px" }}
                                    cover={
                                        <Image
                                            height={160}
                                            alt={family.name}
                                            src={family.imageUrl}
                                            preview={false}
                                        />
                                    }
                                    actions={[
                                        <LikeOutlined
                                            onClick={(event) => {
                                                console.log(event);
                                            }} />,
                                        <StarOutlined onClick={(event) => {
                                            console.log(event);
                                        }} />,
                                        <DownloadOutlined onClick={(event) => {
                                            console.log(event);
                                        }} />
                                    ]}
                                    hoverable>
                                    <Meta title={family.name}
                                        style={{ height: "30px" }} />
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