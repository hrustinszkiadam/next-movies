import { redirect } from 'next/navigation';

export default function Home() {
  //TODO: Implement a landing page for the / route
  //? Main Title, Reservation Button, View a table of movies and their last played dates
  redirect('/reservations/new');
}
