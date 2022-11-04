import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Col, List, Row, Tree, Card, Button, Image, Modal, message } from 'antd'
import { LikeOutlined, StarOutlined, DownloadOutlined } from '@ant-design/icons';
import type { DataNode } from 'antd/es/tree';
import {
    getFamilyCategoryFetch,
    getFamilyPageByKeywordFetch,
    getFamilyPageByCategoryFetch,
    getFamilyVersionsFetch,
    getFamilyFileByIdFetch
} from '../services/family'
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
    const [familyVersions, setFamilyVersions] = useState<number[] | undefined>(undefined);
    const [activeFamily, setActiveFamily] = useState<Family | undefined>(undefined);

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


    async function showVersions(id: number) {
        setModelOpen(true);
        var versions = await getFamilyVersionsById(id);
        setFamilyVersions(versions);
    }

    async function getFamilyVersionsById(id: number) {
        let httpResponse = await getFamilyVersionsFetch(id);
        if (httpResponse.success) {
            var versions = httpResponse.response;
            return versions;
        }
    }
    async function getFamilyFile(id: number, version: number) {
        let httpResponse = await getFamilyFileByIdFetch(id, version);
        if (httpResponse) {
            const link = document.createElement("a");
            let blob = new Blob([httpResponse], {
                type: ".rfa",
            });
            link.href = URL.createObjectURL(blob);
            link.download = `${activeFamily?.name}.rfa`;
            link.click();
        }
        else {
            message.error("获取族文件失败")
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
                                            setActiveFamily(family);
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
                width={"400px"}
                open={modalOpen}
                onCancel={() => {
                    setModelOpen(false);
                }}
                title={activeFamily?.name}
                footer={
                    [
                        <p>
                            免费用户每天只能下载10个
                        </p>
                    ]
                }
            >
                <List
                    dataSource={familyVersions}
                    grid={{ gutter: 8, column: 4 }}
                    renderItem={(version) => (
                        <List.Item key={version}>
                            <Button onClick={() => {
                                getFamilyFile(activeFamily?.id as number, version)
                            }}>
                                {version}
                            </Button>
                        </List.Item>
                    )}>
                </List>
            </Modal>
        </div>
    )
}
export default Library