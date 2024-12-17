import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "./requests/github/query.ts";
import {  Row, Col, Card, Button, Typography, Flex} from "antd";
import { useNavigate } from "react-router";


interface RepositoriesList  {
    name: string,
    size: string,
    numberOfFiles: string,
    owner:string,
    private: boolean,
    id:number
}


const App = () => {
    const navigate = useNavigate();
    const { data, error, loading} = useQuery<{repositories: RepositoriesList[]}>(GET_REPOSITORIES, {variables: {withHooks: true}});
    if (error) return <p>Error :(</p>;


    return <Row gutter={[16, 16]}>
        {data && data.repositories?.map((item) => (<Col span={6}>
            <Card hoverable loading={loading} title={item.name} style={{minWidth: 300}} extra={<Button type="link" onClick={() => navigate(`/${item.owner}/${item.name}`)}>more</Button>} >
                <Flex vertical wrap>
                <Typography.Text>
                   Owner: {item.owner}
                </Typography.Text>
                <Typography.Text>
                    Size: {item.size}
                </Typography.Text>
                    <Typography.Text>
                        Number of files: {item.numberOfFiles}
                    </Typography.Text>
                    <Typography.Text>
                        Private {item.private}
                    </Typography.Text>
                </Flex>
            </Card>
        </Col>))}
    </Row>
}


export default App;

