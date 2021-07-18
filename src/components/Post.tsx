import { Accordion, Card } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
const Post = () => {
  return (
    <Accordion>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0">
          TAB 1
        </Accordion.Toggle>

        <Accordion.Collapse eventKey="0">
          <Card.Body>This is first tab body</Card.Body>
        </Accordion.Collapse>
      </Card>

      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="1">
          TAB 2
        </Accordion.Toggle>

        <Accordion.Collapse eventKey="1">
          <Card.Body>This is second tab body</Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default Post;
