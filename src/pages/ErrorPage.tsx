import { useNavigate } from 'react-router-dom';
import { SmileOutlined } from '@ant-design/icons'
import { Button } from 'antd';

const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <div id="error-page" className="error-page">
      <SmileOutlined rotate={180} style={{ fontSize: '40px' }} />
      <p style={{ marginTop: '15px' }}>Sorry, an unexpected error has occurred.</p>
      <Button
        onClick={() => navigate("/")}
      >
        Go Home
      </Button>
    </div>
  );
}

export default ErrorPage