import React, { useEffect, useState, createRef } from 'react'
import { useNavigate } from "react-router-dom";
import { Col, List, Row, Tree, Card, Button, Image, Modal, message, Input, Tag, Select } from 'antd'
import { LikeOutlined, StarOutlined, DownloadOutlined } from '@ant-design/icons';
import type { DataNode } from 'antd/es/tree';
import type { InputRef } from 'antd'

import {
    getFamilyCategoryFetch,
    getFamilyPageByKeywordFetch,
    getFamilyPageByCategoryFetch,
    getFamilyVersionsFetch,
    getFamilyFileByIdFetch
} from '../services/family'
import { Family } from "../models/family";
import './index.css'


const { Meta } = Card;
const { Search } = Input;

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
    const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
    const [orderValue, setOrderValue] = useState<string>("name");
    const [filters, setFilters] = useState<string[]>([]);
    const inputRef = createRef<InputRef>();

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
            message.error("?????????????????????")
        }
    }

    //TODO:??????????????????
    const handleClose = (removedTag: string) => {
        if (removedTag === searchValue) {
            setSearchValue(undefined);
        }
        const newTags = filters.filter(tag => tag !== removedTag);
        setFilters(newTags);
    };

    const mapTags = (tag: string) => {
        const tagElem = (
            <Tag
                closable
                onClose={e => {
                    e.preventDefault();
                    handleClose(tag);
                }}
            >
                {tag}
            </Tag>
        );
        return (
            <span key={tag} style={{ display: 'inline-block' }}>
                {tagElem}
            </span>
        );
    };

    const tagChild = filters.map(mapTags);

    //???????????????
    useEffect(() => {
        getFamilyPageByKeyword(undefined, pageIndex, 30);
    }, [pageIndex])

    //???????????????
    useEffect(() => {
        getFamilyCategories();
    }, [])

    return (
        <div className='libraryContainer'>
            <Row>
                <Col span={3}>
                    <Tree
                        showLine={true}
                        treeData={treeDatas}
                        onSelect={(key, info) => {
                            var node = info.node;
                            var title = node.title?.toString() as string
                            if (searchValue) {
                                var newFilters = [searchValue]
                                setFilters([...newFilters, title])
                            } else {
                                setFilters([title])
                            }
                            getFamilyPageByCategory(Number(key[0]), pageIndex, 30);
                        }}
                    />
                </Col>
                <Col span={1} />
                <Col span={20}>
                    <div>
                        <Search
                            ref={inputRef}
                            style={{ width: "20%" }}
                            enterButton
                            allowClear
                            showCount
                            maxLength={16}
                            placeholder="?????????????????????"
                            onSearch={(value) => {
                                setSearchValue(value)
                                setFilters([value])
                            }}
                        />
                    </div>
                    <div style={{ marginTop: "20px" }}>
                        <span style={{ marginBottom: 16 }}>
                            {tagChild}
                        </span>
                        <Button style={{ display: "inline-block" }} onClick={() => {
                            setFilters([]);
                        }} >
                            ????????????
                        </Button>
                        <span style={{ marginLeft: "40px", width: "40%", position: "absolute", right: "0px" }}>
                            <Select
                                style={{ width: "20%", display: "inline-block" }}
                                value={orderValue}

                                onChange={(value) => {
                                    setOrderValue(value);
                                }}

                                options={
                                    [
                                        {
                                            value: "name",
                                            label: '?????????'
                                        },
                                        {
                                            value: "download",
                                            label: '????????????'
                                        },
                                        {
                                            value: "star",
                                            label: '????????????'
                                        },
                                        {
                                            value: "like",
                                            label: '????????????'
                                        },
                                    ]
                                } />
                        </span>
                    </div>

                    <List
                        style={{
                            minHeight: "1000px", width: "1200px", marginTop: "20px"
                        }}
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
                            <List.Item
                                onClick={() => {
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
                                            title='??????'
                                            onClick={(event) => {
                                                event.stopPropagation();

                                            }} />,
                                        <StarOutlined
                                            title='??????'
                                            onClick={(event) => {
                                                event.stopPropagation();
                                            }} />,
                                        <DownloadOutlined
                                            title='??????'
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                showVersions(family.id)
                                                setActiveFamily(family);
                                            }} />
                                    ]}
                                >
                                    <div>
                                        <div>
                                            {family.name}
                                        </div>
                                        <div>
                                            {family.createTime}
                                        </div>
                                    </div>
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
                            ??????????????????????????????10???
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