import React, { useState } from "react";
import { Form, Input, Grid } from "semantic-ui-react";

import { useSubstrate } from "./substrate";
import { TxButton } from "./substrate/components";

export default function Transfer(props) {
  const { api } = useSubstrate();
  const { accountPair } = props;
  const [status, setStatus] = useState("");
  const [formState, setFormState] = useState({ addressTo: null, amount: 0 });

  const onChange = (_, data) =>
    setFormState(prevState => ({ ...formState, [data.state]: data.value }));

  const { addressTo, amount } = formState;

  return (
    <Grid.Column>
      <h1>Transfer</h1>
      <Form>
        <Form.Field>
          <Input fluid label="To" type="text" placeholder="address"
            state="addressTo" onChange={onChange} />
        </Form.Field>
        <Form.Field>
          <Input fluid label="Amount" type="number"
            state="amount" onChange={onChange} />
        </Form.Field>
        <Form.Field>
          <TxButton
            accountPair={accountPair}
            label={"Send"}
            params={[addressTo, amount]}
            setStatus={setStatus}
            tx={api.tx.balances.transfer} />
        </Form.Field>
        <div style={{overflowWrap: "break-word"}}>{status}</div>
      </Form>
    </Grid.Column>
  );
}
