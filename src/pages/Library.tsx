import { Col, List, Row, Tree } from 'antd'
import React from 'react'

function Library() {
    return (
        <div>
            <Row>
                <Col span={6}>
                    <Tree />
                </Col>
                <Col span={18}>
                    <List />
                </Col>
            </Row>
        </div>
    )
}

export default Library