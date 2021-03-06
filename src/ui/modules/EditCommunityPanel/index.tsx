import { Trans } from '@lingui/macro';
import { i18nMark } from '@lingui/react';
import { Input, Textarea } from '@rebass/forms';
import { FormikHook } from 'ui/@types/types';
import * as React from 'react';
import DropzoneArea from 'ui/modules/DropzoneModal';
import Alert from 'ui/elements/Alert';
import Button from 'ui/elements/Button';
import { clearFix } from 'polished';
import media from 'styled-media-query';
import styled from 'ui/themes/styled';
import { Flex, Text, Box } from 'rebass/styled-components';

import { Actions, AlertWrapper, Container, ContainerForm, CounterChars } from 'ui/modules/Modal';

const tt = {
  placeholders: {
    name: i18nMark('Choose a name for the community'),
    summary: i18nMark(
      'Please describe who might be interested in this community and what kind of collections it is likely to contain...'
    ),
    icon: i18nMark('Enter the URL of an image to represent the community')
  }
};

export interface Props {
  cancel: () => any;
  formik: FormikHook<EditCommunityFormValues>;
}

export interface EditCommunityFormValues {
  name: string;
  summary: string;
  icon: string | File | undefined;
}

export const EditCommunityPanel: React.FC<Props> = ({ cancel, formik }) => {
  const onIconFileSelected = React.useCallback(
    (file: File) => formik.setValues({ ...formik.values, icon: file }),
    [formik]
  );
  const initialIconUrl = 'string' === typeof formik.values.icon ? formik.values.icon : '';
  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <Hero>
          <Box sx={{ width: '120px', height: '120px' }}>
            <DropzoneArea
              initialUrl={initialIconUrl}
              onFileSelect={onIconFileSelected}
              filePattern="image/*"
            />
          </Box>
          {/* <Background style={{ backgroundImage: `url("${c.icon}")` }} /> */}
          <HeroInfo>
            <Title fontWeight={'bold'}>
              <CollectionContainerForm>
                <Input
                  placeholder={tt.placeholders.name}
                  disabled={formik.isSubmitting}
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                <CounterChars>{60 - formik.values.name.length}</CounterChars>
                {formik.errors.name && (
                  <AlertWrapper>
                    <Alert variant="negative">{formik.errors.name}</Alert>
                  </AlertWrapper>
                )}
              </CollectionContainerForm>
            </Title>

            <Description mt={2}>
              <CollectionContainerForm>
                <Textarea
                  placeholder={tt.placeholders.summary}
                  disabled={formik.isSubmitting}
                  name="summary"
                  value={formik.values.summary}
                  onChange={formik.handleChange}
                />
                <CounterChars>{500 - formik.values.summary.length}</CounterChars>
                {formik.errors.summary && (
                  <AlertWrapper>
                    <Alert variant="negative">{formik.errors.summary}</Alert>
                  </AlertWrapper>
                )}
              </CollectionContainerForm>
            </Description>
          </HeroInfo>
        </Hero>

        <Actions>
          <Button
            variant="primary"
            isSubmitting={formik.isSubmitting}
            isDisabled={formik.isSubmitting}
            type="submit"
            style={{ marginLeft: '10px' }}
            // onClick={formik.submitForm}
          >
            <Trans>Save</Trans>
          </Button>
          <Button variant="outline" onClick={cancel}>
            <Trans>Cancel</Trans>
          </Button>
        </Actions>
      </form>
    </Container>
  );
};

const CollectionContainerForm = styled(ContainerForm)`
  input {
    background: #fbfbfb;
    border: 0;
    font-weight: 700;
  }

  textarea {
    background: #fbfbfb;
    border-radius: 2px;
    border: 0;
    height: 120px;
    resize: none;
  }
`;

const Title = styled(Text)`
  color: ${props => props.theme.colors.mediumdark};
`;

const Description = styled(Text)`
  color: ${props => props.theme.colors.mediumdark};
`;

const HeroInfo = styled.div`
  flex: 1;
  margin-left: 16px;
  position: relative;
  ${clearFix()};
  & h2 {
    margin: 0;
    line-height: 32px !important;
    color: ${props => props.theme.colors.mediumdark};
    ${media.lessThan('medium')`
      margin-top: 8px;
    `};
  }
  & p {
    margin: 0;
    color: rgba(0, 0, 0, 0.8);
    margin-top: 8px;
    color: ${props => props.theme.colors.mediumdark};
  }
  .--rtl & {
    margin-right: 16px;
    margin-left: 0px;
  }
`;

const Hero = styled(Flex)`
  width: 100%;
  position: relative;
  padding: 16px;
  ${media.lessThan('medium')`
  text-align: center;
  display: block;
`};
`;

export default EditCommunityPanel;
