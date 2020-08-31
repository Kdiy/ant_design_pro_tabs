import React from 'react';
import { Card, Typography, Alert, Icon } from 'antd';

export default () => (
  <>
    <Card>

      <Typography.Title
        level={2}
        style={{
          textAlign: 'center',
        }}
      >
        <Icon type="smile" theme="twoTone" /> Ant Design Pro{' '}
        <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" /> You
      </Typography.Title>
    </Card>
    <p
      style={{
        textAlign: 'center',
        marginTop: 24,
      }}
    >
      Want to add more pages? Please refer to{' '}
      <a href="https://pro.ant.design/docs/block-cn" target="_blank" rel="noopener noreferrer">
        use block
      </a>
      。
    </p>
  </>
);
