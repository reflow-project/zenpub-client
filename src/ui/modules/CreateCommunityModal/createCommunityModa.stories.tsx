import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Modal from '.';
import { themeDeco } from '../../styleguide/storiesThemeDecorator';

storiesOf('Modules/CreateCommunity', module)
  .addDecorator(themeDeco())
  .add('Standard submitting', () => (
    <Modal
      toggleModal={action('close modal')}
      submit={action('send stuff')}
      isSubmitting
      initialValues={{
        image: 'http://test.com/img.jpg',
        name: 'my-name',
        summary: 'the summary'
      }}
    />
  ))
  .add('Standard not submitting', () => (
    <Modal toggleModal={action('close modal')} submit={action('send stuff')} />
  ));
