import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { Col, List, Row, Tree, Card, Button, Image, Modal } from 'antd'
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
    const [modalOpen, setModelOpen] = useState<boolean>(false);


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

    function showVersions(id: number) {
        setModelOpen(true);
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
                            console.log(key);
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
                            <List.Item onClick={() => {
                                navigate(`family/${family.id}`)
                            }}>
                                <Card style={{ width: "220px" }}
                                    hoverable
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
                                                event.stopPropagation();

                                            }} />,
                                        <StarOutlined onClick={(event) => {
                                            event.stopPropagation();

                                        }} />,
                                        <DownloadOutlined onClick={(event) => {
                                            event.stopPropagation();
                                            showVersions(family.id)
                                        }} />
                                    ]}
                                >
                                    <Meta title={family.name}
                                        description={`上传时间 ${family.createTime}`}
                                        style={{ height: "30px" }} />
                                </Card>
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>

            <Modal
                open={modalOpen}
                onCancel={() => {
                    setModelOpen(false);
                }}
                footer={
                    [

                    ]
                }
            >
                <List
                    renderItem={(item) => (
                        <List.Item>
                            <Button type='link'
                            />
                        </List.Item>
                    )}>

                </List>
            </Modal>
        </div>
    )
}

export default Library