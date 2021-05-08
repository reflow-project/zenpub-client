import { Trans } from '@lingui/macro';
import * as React from 'react';
import Button from '../../elements/Button';
import Input from '../../elements/Input';
import Select from 'ui/elements/Select';
import styled from '../../themes/styled';

export type IntentActions = {
  id: string;
  label: string;
  note?: string;
};

export type EconomicEventVariables = {
  note: string;
  action: string;
  provider: string;
  receiver: string;
  hasUnit: string;
  hasNumericalValue: number | string | undefined;
};

type Person = {
  id: string;
  name: string;
  __typename: string;
};

type UnitPage = {
  id: string;
  label: string;
  symbol: string;
};

type EconomicEvent = {
  id: string;
  provider: Person;
  receiver: Person;
  __typename: string;
};

export type EconomicEventManagerProps = {
  actionList: IntentActions[] | undefined;
  economicEvents: {
    loading: boolean;
    error: React.ReactNode;
    data: EconomicEvent[];
  };
  unitPages: {
    edges: UnitPage[];
  };
  setAction: any;
};

export const EconomicEventManager: React.FC<EconomicEventManagerProps> = ({
  actionList,
  setAction,
  economicEvents,
  unitPages
}) => {
  const [eventVariables, setEventVariables] = React.useState({
    note: '',
    action: { id: '', label: '' },
    provider: { id: '', label: '' },
    receiver: { id: '', label: '' },
    hasUnit: { id: '', label: '' },
    hasNumericalValue: ''
  });

  const [providerLst, setProviderLst] = React.useState<any>([]);
  const [receiverLst, setReceiverLst] = React.useState<any>([]);
  const [unitLst, setUnitLst] = React.useState<any>([]);

  React.useEffect(() => {
    if (economicEvents.data?.length) {
      const providers = economicEvents.data.map(el => ({
        id: el.provider.id,
        label: el.provider.name
      }));
      const receivers = economicEvents.data.map(el => ({
        id: el.receiver.id,
        label: el.receiver.name
      }));

      setProviderLst(providers);
      setReceiverLst(receivers);
    }
  }, [economicEvents]);

  React.useEffect(() => {
    if (unitPages?.edges.length) {
      const unit = unitPages.edges.map(el => ({
        id: el.id,
        label: `${el.label} / ${el.symbol}`
      }));

      setUnitLst(unit);
    }
  }, [unitPages]);

  React.useEffect(() => {
    return () => {
      setEventVariables({
        note: '',
        action: { id: '', label: '' },
        provider: { id: '', label: '' },
        receiver: { id: '', label: '' },
        hasUnit: { id: '', label: '' },
        hasNumericalValue: ''
      });
    };
  }, []);

  const actionHandler = (name: string, option: IntentActions) => {
    eventVariablesHandler({ target: { name, value: option.id } });
    setAction(option.id);
  };

  const eventVariablesHandler = (event: any) => {
    const { name, value } = event.target;
    setEventVariables({
      ...eventVariables,
      [name]: value
    });
  };

  const formSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    console.log('Submit', eventVariables);
  };

  return (
    <div style={{ margin: '0 10px 12px 0' }}>
      <FormStyled onSubmit={formSubmit}>
        <FormGroup>
          <FormLabel>Select Action</FormLabel>
          <Select
            options={actionList}
            variant="primary"
            id="action"
            name="action"
            onSelect={actionHandler}
          />
        </FormGroup>
        {providerLst.length ? (
          <div>
            <div className="d-flex">
              <FormGroup>
                <FormLabel>Provider</FormLabel>
                <Select
                  options={providerLst}
                  variant="primary"
                  id="provider"
                  name="provider"
                  onSelect={actionHandler}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Receiver</FormLabel>
                <Select
                  options={receiverLst}
                  variant="primary"
                  id="receiver"
                  name="receiver"
                  onSelect={actionHandler}
                />
              </FormGroup>
            </div>
            <FormGroup>
              <FormLabel>note</FormLabel>
              <Input
                id="note"
                type="textarea"
                name="note"
                hint={{ class: 'error', value: '' }}
                onChange={eventVariablesHandler}
                placeholder="note"
                value={eventVariables.note}
              />
            </FormGroup>

            <div className="d-flex">
              <FormGroup>
                <FormLabel>unit</FormLabel>
                <Select
                  options={unitLst}
                  variant="primary"
                  id="hasUnit"
                  name="hasUnit"
                  onSelect={actionHandler}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>numerical value</FormLabel>
                <Input
                  type="number"
                  id="hasNumericalValue"
                  name="hasNumericalValue"
                  onChange={eventVariablesHandler}
                  hint={{ class: 'error', value: '' }}
                  placeholder="hasNumericalValue"
                  value={eventVariables.hasNumericalValue}
                />
              </FormGroup>
            </div>
            <ButtonWrap>
              <Button variant="info" type="submit" onClick={formSubmit} className="event_btn">
                <Trans>Create Event</Trans>
              </Button>
            </ButtonWrap>
          </div>
        ) : null}
      </FormStyled>
    </div>
  );
};

const ButtonWrap = styled.div`
  width: 100%;
  margin-bottom: 16px;
  > button {
    width: 100%;
  }

  .event_btn {
    height: 40px;
    text-transform: uppercase;
    font-family: 'Arial', sans-serif;
    font-weight: 600;
    letter-spacing: 1px;
  }
`;

export default EconomicEventManager;

const FormGroup = styled('div')<any>`
  display: block;
`;
const FormLabel = styled('label')<any>`
  display: block;
  font-size: 10px;
  color: #aaa;
  font-family: 'Arial', sans-serif;
  text-transform: uppercase;
  margin-bottom: 2px;
`;

const FormStyled = styled('form')<any>`
  .d-flex {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > div {
      width: calc(50% - 5px);
    }

    button {
      width: 100%;
      background: #cdcdcd;
    }
  }
`;