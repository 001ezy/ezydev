"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { sitePath } from "@/lib/site-path";

const rooms = [
  { id: "quiet", name: "Quiet Garden Room", kind: "ROOM", rate: 220, capacity: 2, features: "King bed · Garden view · 34 m²", visual: "garden" },
  { id: "ridge", name: "Ridge View Suite", kind: "SUITE", rate: 390, capacity: 2, features: "King bed · Mountain view · 58 m²", visual: "ridge" },
  { id: "family", name: "The Family House", kind: "VILLA", rate: 560, capacity: 4, features: "Two bedrooms · Private terrace · 92 m²", visual: "house" },
] as const;

type Room = (typeof rooms)[number];
const dayMs = 24 * 60 * 60 * 1000;
const fmt = (amount: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);

function localDateValue(date = new Date()) {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 10);
}

function utcDay(value: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [year, month, day] = value.split("-").map(Number);
  const timestamp = Date.UTC(year, month - 1, day);
  const parsed = new Date(timestamp);
  if (parsed.getUTCFullYear() !== year || parsed.getUTCMonth() !== month - 1 || parsed.getUTCDate() !== day) return null;
  return timestamp;
}

function stayNights(arrival: string, departure: string, today: string) {
  if (!today) return 0;
  const start = utcDay(arrival);
  const end = utcDay(departure);
  if (start === null || end === null || arrival < today || end <= start) return 0;
  return (end - start) / dayMs;
}

export default function AlterraDemo() {
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [guests, setGuests] = useState(2);
  const [kind, setKind] = useState("Any stay");
  const [room, setRoom] = useState<Room | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [today, setToday] = useState("");
  const nights = useMemo(() => stayNights(arrival, departure, today), [arrival, departure, today]);
  const available = rooms.filter((stay) => stay.capacity >= guests && (kind === "Any stay" || stay.kind === kind));
  const canRequest = Boolean(room && nights > 0 && room.capacity >= guests && (kind === "Any stay" || room.kind === kind));

  function chooseRoom(selected: Room) {
    setRoom(selected);
    setConfirmed(false);
    setBookingError("");
  }

  function changeArrival(value: string) {
    if (!today) setToday(localDateValue());
    setArrival(value);
    if (departure && departure <= value) setDeparture("");
    setConfirmed(false);
    setBookingError("");
  }

  function changeDeparture(value: string) {
    if (!today) setToday(localDateValue());
    setDeparture(value);
    setConfirmed(false);
    setBookingError("");
  }

  function changeGuests(value: string) {
    const nextGuests = Number(value);
    setGuests(nextGuests);
    if (room && room.capacity < nextGuests) setRoom(null);
    setConfirmed(false);
    setBookingError("");
  }

  function changeKind(value: string) {
    setKind(value);
    if (room && value !== "Any stay" && room.kind !== value) setRoom(null);
    setConfirmed(false);
    setBookingError("");
  }

  function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    if (!canRequest) {
      setBookingError("Choose valid future dates and a room that fits your guest count.");
      return;
    }
    setBookingError("");
    setConfirmed(true);
  }

  return <main className="alterra-site">
    <header className="alterra-nav"><a href={sitePath("/")} className="alterra-mark">ALTERRA<span> / RETREAT</span></a><nav><a href="#stay">THE STAY</a><a href="#rooms">ROOMS</a><a href="#place">THE PLACE</a></nav><a className="alterra-nav-cta" href="#rooms">PLAN YOUR STAY ↗</a></header>
    <section className="alterra-hero"><div className="alterra-hero-copy"><span className="alterra-kicker">A QUIETER KIND OF SOMEWHERE</span><h1>Find your<br/><i>elsewhere.</i></h1><p>A small mountain retreat for longer mornings, open skies and time that belongs to you.</p><a href="#rooms">EXPLORE THE RETREAT ↓</a><small>ALTERRA RETREAT · CONCEPT PROJECT · ISSYK-KUL</small></div><div className="alterra-landscape"><div className="alterra-sun"/><div className="mountain mountain-back"/><div className="mountain mountain-front"/><div className="alterra-cabin"><i/><b/><span/></div><div className="land-water"/><label>42° 37′ N / 76° 59′ E</label></div></section>
    <section className="alterra-intro" id="stay"><span className="alterra-kicker">ARRIVE / EXHALE / BEGIN AGAIN</span><p>Far enough to <i>feel away.</i><br/>Close enough to feel at home.</p><span>Thoughtful rooms, warm materials and a landscape that changes the pace. Come for a weekend, stay for the quiet.</span></section>
    <section className="alterra-rooms" id="rooms"><div className="alterra-head"><div><span className="alterra-kicker">A PLACE THAT FITS</span><h2>Choose your<br/><i>kind of quiet.</i></h2></div><span className="stay-label">CONCEPT AVAILABILITY · PRICES IN USD</span></div>
      <div className="stay-search"><label>ARRIVAL<input type="date" min={today || undefined} value={arrival} onFocus={() => !today && setToday(localDateValue())} onChange={(event) => changeArrival(event.target.value)}/></label><label>DEPARTURE<input type="date" min={arrival || today || undefined} value={departure} onFocus={() => !today && setToday(localDateValue())} onChange={(event) => changeDeparture(event.target.value)}/></label><label>GUESTS<select value={guests} onChange={(event) => changeGuests(event.target.value)}>{[1, 2, 3, 4].map((count) => <option key={count} value={count}>{count}</option>)}</select></label><label>STAY TYPE<select value={kind} onChange={(event) => changeKind(event.target.value)}><option>Any stay</option><option>ROOM</option><option>SUITE</option><option>VILLA</option></select></label></div>
      <div className="alterra-room-grid">{available.length ? available.map((stay) => <article className="alterra-room" key={stay.id}><button type="button" className={`room-photo ${stay.visual}`} onClick={() => chooseRoom(stay)} aria-label={`Select ${stay.name}`}><div className="room-window"><span/></div><div className="room-bed"><i/><b/></div><span className="room-view">OPEN FOR YOUR DATES ↗</span></button><div className="room-info"><div><span>{stay.kind} / {stay.features.split(" · ").at(-1)}</span><h3>{stay.name}</h3><small>{stay.features}</small></div><div className="room-rate"><b>{fmt(stay.rate)}</b><span> / NIGHT</span></div></div><button type="button" className="room-select" onClick={() => chooseRoom(stay)}>{room?.id === stay.id ? "SELECTED ✓" : "SELECT THIS STAY ↗"}</button></article>) : <div className="no-stays">No stays fit this selection. Try a different guest count or stay type.</div>}</div>
    </section>
    <section className="alterra-place" id="place"><div className="alterra-place-art"><div className="place-sun"/><div className="place-mountain"/><div className="place-lake"/><span>ISSYK-KUL / KYRGYZSTAN</span></div><div><span className="alterra-kicker">A LANDSCAPE THAT LINGERS</span><h2>Let the<br/>horizon <i>hold.</i></h2><p>By the water, beneath the Tian Shan. A place for slow walks, long lunches and evenings with nowhere else to be.</p><div className="place-facts"><span>01 / LAKE AT THE DOOR</span><span>02 / MOUNTAINS NEARBY</span><span>03 / TIME, UNSCHEDULED</span></div></div></section>
    <section className="alterra-booking" id="booking"><div><span className="alterra-kicker">YOUR STAY, TAKING SHAPE</span><h2>A few nights<br/>to <i>reset.</i></h2><p>Select a room and valid future dates above to see a clear estimate for your stay.</p><small>DEMONSTRATION BOOKING · NO REAL ROOM IS RESERVED</small></div><div className="alterra-book-panel">{room ? <><div className="alterra-selected"><span>YOUR SELECTION</span><b>{room.name}</b><small>{arrival || "Choose arrival"} → {departure || "Choose departure"} · {nights} {nights === 1 ? "night" : "nights"} · {guests} {guests === 1 ? "guest" : "guests"}</small></div><div className="alterra-cost"><span>ESTIMATED STAY</span><b>{nights > 0 ? fmt(room.rate * nights) : "Choose valid dates"}</b><small>{fmt(room.rate)} × {nights} {nights === 1 ? "night" : "nights"} · before taxes</small></div>{confirmed ? <div className="alterra-success" role="status">DEMO REQUEST NOTED.<br/>NO RESERVATION WAS CREATED.<br/>{room.name} · {nights} {nights === 1 ? "night" : "nights"} · {fmt(room.rate * nights)}</div> : <form className="alterra-form" onSubmit={submitBooking}><label>ARRIVAL<input required type="date" min={today || undefined} value={arrival} onFocus={() => !today && setToday(localDateValue())} onChange={(event) => changeArrival(event.target.value)}/></label><label>DEPARTURE<input required type="date" min={arrival || today || undefined} value={departure} onFocus={() => !today && setToday(localDateValue())} onChange={(event) => changeDeparture(event.target.value)}/></label><input required minLength={2} placeholder="YOUR NAME" aria-label="Your name"/><input required type="email" placeholder="EMAIL ADDRESS" aria-label="Email address"/><button type="submit">REQUEST THIS STAY ↗</button>{bookingError && <small className="alterra-form-error" role="alert">{bookingError}</small>}<small>Concept only. No payment taken and no data stored.</small></form>}</> : <div className="alterra-empty"><span>01</span><h3>A good stay starts<br/>with a room.</h3><p>Choose any room above to see your estimate.</p><a href="#rooms">EXPLORE THE ROOMS ↑</a></div>}</div></section>
    <footer className="alterra-footer"><a href={sitePath("/")}>EZY DEV. / DEMO PORTFOLIO</a><span>ALTERRA RETREAT · CONCEPT PROJECT</span><a href="#top">BACK TO TOP ↑</a></footer>
  </main>;
}
