import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Message } from 'semantic-ui-react';
import { dbCreateApiRequested } from '../../actions/api';
import { dbCreateApiSelector } from '../../selectors/api';
import { IApiState, IState as Store } from '../../types/redux';

interface IState {
  [key: string]: string;
}

interface IProps extends IApiState {
  dbCreateApiRequested: typeof dbCreateApiRequested;
}

interface IEventProps {
  name: string;
  value: string;
}

export class DbApi extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { text: '' };
  }

  public render() {
    const { fileUrl } = this.state;
    const { error, inProgress, result } = this.props;
    return (
      <Form
        onSubmit={this.onFileSave}
        loading={inProgress}
        error={!!error}
        success={!!result}
      >
        <Form.Group>
          <Form.Input
            placeholder="Todos item text"
            name="text"
            type="text"
            value={fileUrl}
            onChange={this.handleChange}
            required={true}
            id="text"
          />

          <Button content="Save Todos Item" />
        </Form.Group>
        <Message success={true} header="Todos Api Result" content={result} />
        <Message
          error={true}
          header="Error Saving File"
          content={error && error.message}
        />
      </Form>
    );
  }

  private handleChange = (
    _: React.SyntheticEvent<any>,
    { name, value }: IEventProps,
  ) => this.setState({ [name]: value });

  private onFileSave = () => this.props.dbCreateApiRequested(this.state.text);
}

const mapStateToProps = (state: Store) => ({
  ...dbCreateApiSelector(state),
});

export default connect(
  mapStateToProps,
  { dbCreateApiRequested },
)(DbApi);
