import React, { useEffect, useState } from 'react'
import { Col, List, Row, Tree } from 'antd'
import type { DataNode } from 'antd/es/tree';

function Library() {
    const [treeDatas, setTreeDatas] = useState<DataNode[]>([]);
    const dig = (path = '0', level = 3) => {
        const list = [];
        for (let i = 0; i < 10; i += 1) {
            const key = `${path}-${i}`;
            const treeNode: DataNode = {
                title: key,
                key,
            };

            if (level > 0) {
                treeNode.children = dig(key, level - 1);
            }

            list.push(treeNode);
        }
        return list;
    };

    useEffect(() => {
        let data = dig();
        setTreeDatas(data);
    }, [])
    return (
        <div style={{ height: "1000px", padding: "50px" }}>
            <Row>
                <Col span={6}>
                    <Tree

                        treeData={treeDatas}
                    />
                </Col>
                <Col span={18}>
                    <List
                    grid={{
                        column:5,
                        
                    }}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default Library