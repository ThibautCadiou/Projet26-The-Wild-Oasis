import styled from 'styled-components';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin } from '../../services/apiCabins';
import { toast } from 'react-hot-toast';
import FormRow from '../../ui/FormRow';

const Label = styled.label`
  font-weight: 500;
`;

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  const queryClient = useQueryClient();

  const { mutate, isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('New Cabin successfully created');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: (err) => {
      toast.success('New Cabin NOT successfully created');
    },
  });

  function onSubmit(data) {
    mutate(data);
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label='Cabin Name' error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          disabled={isCreating}
          {...register('name', {
            required: 'this field is required',
          })}
        />
      </FormRow>

      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          disabled={isCreating}
          id='maxCapacity'
          {...register('maxCapacity', {
            required: 'this field is required',
            min: { value: 1, message: 'Please give a name (a number above 0 !' },
          })}
        />
      </FormRow>

      <FormRow label='Regular price' error={errors?.regularPrice?.message}>
        <Input
          type='number'
          id='regularPrice'
          disabled={isCreating}
          {...register('regularPrice', {
            required: 'this field is required',
            min: { value: 1, message: 'Please give a correct price (a number above 0 !' },
          })}
        />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          disabled={isCreating}
          defaultValue={0}
          {...register('discount', {
            required: 'this field is required',
            validate: (value) =>
              value <= getValues().regularPrice ||
              'Discount shouldnt be higher than the regular price',
          })}
        />
      </FormRow>

      <FormRow label='Description for website' error={errors?.description?.message}>
        <Textarea
          type='text'
          id='description'
          disabled={isCreating}
          defaultValue=''
          {...register('description', { required: 'this field is required' })}
        />
      </FormRow>

      <FormRow label='Cabin Photo'>
        <FileInput id='image' accept='image/*' />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
