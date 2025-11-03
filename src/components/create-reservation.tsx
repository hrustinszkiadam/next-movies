'use client';

import { Activity, useActionState } from 'react';
import { Button } from './ui/button';
import {
  FieldSet,
  FieldLegend,
  FieldDescription,
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from './ui/field';
import { Input } from './ui/input';
import { Movie, NewReservationState } from '@/lib/definitions';
import { Combobox } from './ui/combobox';
import { createReservation } from '@/lib/actions';

type CreateReservationProps = {
  movies: Movie[];
};

export default function CreateReservation({ movies }: CreateReservationProps) {
  const initialState: NewReservationState = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(
    createReservation,
    initialState,
  );

  return (
    <form
      action={formAction}
      className='space-y-8 tracking-wide'
    >
      <FieldSet>
        <FieldLegend>Személyes Adatok</FieldLegend>
        <FieldDescription>
          A cím felvételéhez kérjük, add meg a nevedet és email címedet.
        </FieldDescription>
        <FieldGroup>
          <Field data-invalid={!!state.errors?.name}>
            <FieldLabel htmlFor='name'>Teljes Név</FieldLabel>
            <Input
              id='name'
              name='name'
              type='text'
              placeholder='Kovács Péter'
              aria-invalid={!!state.errors?.name}
              autoComplete='name'
            />
            <Activity mode={state.errors?.name ? 'visible' : 'hidden'}>
              {state.errors!.name?.map((error: string) => (
                <FieldError key={error}>{error}</FieldError>
              ))}
            </Activity>
          </Field>
        </FieldGroup>
        <FieldGroup>
          <Field data-invalid={!!state.errors?.email}>
            <FieldLabel htmlFor='email'>Email Cím</FieldLabel>
            <Input
              id='email'
              name='email'
              type='email'
              placeholder='kovacs.peter@example.com'
              aria-invalid={!!state.errors?.email}
              autoComplete='email'
            />
            <Activity mode={state.errors?.email ? 'visible' : 'hidden'}>
              {state.errors!.email?.map((error: string) => (
                <FieldError key={error}>{error}</FieldError>
              ))}
            </Activity>
          </Field>
        </FieldGroup>
      </FieldSet>
      <FieldSet>
        <FieldLegend variant='label'>Foglalás Részletei</FieldLegend>
        <FieldDescription>
          Add meg a foglalás részleteit, a film címét és a foglalás időpontját.
        </FieldDescription>
        <FieldGroup>
          <Field data-invalid={!!state.errors?.date}>
            <FieldLabel htmlFor='date'>Dátum</FieldLabel>
            <Input
              id='date'
              name='date'
              type='datetime-local'
              aria-invalid={!!state.errors?.date}
              autoComplete='off'
            />
            <Activity mode={state.errors?.date ? 'visible' : 'hidden'}>
              {state.errors!.date?.map((error: string) => (
                <FieldError key={error}>{error}</FieldError>
              ))}
            </Activity>
          </Field>
        </FieldGroup>
        <FieldGroup>
          <Field data-invalid={!!state.errors?.seats}>
            <FieldLabel htmlFor='seats'>
              Hány jegyet szeretnél foglalni?
            </FieldLabel>
            <Combobox
              list={Array.from({ length: 10 }, (_, i) => ({
                value: `${i + 1}`,
                label: `${i + 1}`,
              }))}
              title='Jegyek Száma'
              name='seats'
            />
            <Activity mode={state.errors?.seats ? 'visible' : 'hidden'}>
              {state.errors!.seats?.map((error: string) => (
                <FieldError key={error}>{error}</FieldError>
              ))}
            </Activity>
          </Field>
        </FieldGroup>
        <FieldGroup>
          <Field data-invalid={!!state.errors?.movieId}>
            <FieldLabel htmlFor='movieId'>
              Melyik filmet szeretnéd foglalni?
            </FieldLabel>
            <Combobox
              list={movies.map((movie) => ({
                value: movie.id,
                label: movie.title,
              }))}
              title='Film Kiválasztása'
              name='movieId'
            />
            <Activity mode={state.errors?.movieId ? 'visible' : 'hidden'}>
              {state.errors!.movieId?.map((error: string) => (
                <FieldError key={error}>{error}</FieldError>
              ))}
            </Activity>
          </Field>
        </FieldGroup>
      </FieldSet>
      <FieldGroup>
        <Button
          type='submit'
          disabled={isPending}
        >
          Foglalás
        </Button>
        <Activity mode={state.message ? 'visible' : 'hidden'}>
          <FieldError
            key={state.message}
            className='text-center'
          >
            {state.message}
          </FieldError>
        </Activity>
      </FieldGroup>
    </form>
  );
}
