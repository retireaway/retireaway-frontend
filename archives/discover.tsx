// import {
//   ScaleIcon,
//   HeartPulseIcon,
//   ShieldIcon,
//   UserRoundIcon,
//   UsersRoundIcon,
//   StarIcon,
//   SunIcon,
// } from "lucide-react";
//
// import { Chip } from "@/components/chip-base";
// import { Grading } from "@/components/grading";
// import { Preview } from "@/components/destination-preview";
// import { DataCard } from "@/components/data-card";
// import { List } from "@/components/destination-list";
//
// export function App() {
//   return (
//     <section>
//       <div className="relative h-90 bg-[url(/images/bg-hero.jpg)] bg-cover bg-center">
//         <div className="absolute top-0 left-0 size-full bg-black/40"></div>
//         <div className="z-10 flex size-full items-center justify-center">
//           <header className="z-10 flex flex-col items-center justify-center">
//             <h1 className="text-center text-3xl font-semibold text-white">
//               Plan the Perfect <br />
//               Retirement
//             </h1>
//             <div className="h-4" />
//             <p className="text-lg text-white">Compare destinations worldwide</p>
//             <div className="h-2" />
//             <a
//               href="#"
//               className="rounded-xl bg-neutral-800 px-6 py-2 text-white"
//             >
//               Explore Destinations
//             </a>
//           </header>
//         </div>
//       </div>
//       <div className="h-4" />
//       <div className="mx-auto flex min-h-svh max-w-160 flex-col gap-8 bg-neutral-50/50 p-4">
//         <Preview>
//           <Preview.Title href="#">Low Budget</Preview.Title>
//           <Preview.Slider>
//             <Preview.Slider.Item>
//               <PanamaCard />
//             </Preview.Slider.Item>
//             <Preview.Slider.Item>
//               <PanamaCard />
//             </Preview.Slider.Item>
//             <Preview.Slider.Item>
//               <PanamaCard />
//             </Preview.Slider.Item>
//           </Preview.Slider>
//         </Preview>
//         <Preview>
//           <Preview.Title href="#">Beach Vibes</Preview.Title>
//           <Preview.Slider>
//             <Preview.Slider.Item>
//               <PanamaCard />
//             </Preview.Slider.Item>
//             <Preview.Slider.Item>
//               <PanamaCard />
//             </Preview.Slider.Item>
//             <Preview.Slider.Item>
//               <PanamaCard />
//             </Preview.Slider.Item>
//           </Preview.Slider>
//         </Preview>
//         <Preview>
//           <Preview.Title href="#">Low Budget</Preview.Title>
//           <Preview.Slider>
//             <Preview.Slider.Item>
//               <PanamaCard />
//             </Preview.Slider.Item>
//             <Preview.Slider.Item>
//               <PanamaCard />
//             </Preview.Slider.Item>
//             <Preview.Slider.Item>
//               <PanamaCard />
//             </Preview.Slider.Item>
//           </Preview.Slider>
//         </Preview>
//         <PanamaCardListItem />
//       </div>
//     </section>
//   );
// }
//
// function PanamaCard() {
//   return (
//     <Preview.Card>
//       <Preview.Card.Hero>
//         <Preview.Card.Image
//           alt="image"
//           src="/images/countries/panama-800-1000.jpg"
//         />
//
//         <div className="absolute inset-0 top-0 left-0 h-full w-full rounded-xl bg-linear-to-b from-black/10 to-black/60"></div>
//
//         <Preview.Card.Header>
//           <div className="flex flex-row items-center justify-start gap-1">
//             <Preview.Card.Title>Panama</Preview.Card.Title>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="25"
//               height="20"
//               viewBox="0 0 12 8"
//             >
//               <title>Flag of Panama</title>
//               <path fill="#fff" d="m0 4V0h6l6 4v4H6z" />
//               <path
//                 fill="#da121a"
//                 d="m6 0h6v4H6zm3 5L9.6498 7 7.9485 5.7639h2.103L8.3502 7z"
//               />
//               <path
//                 fill="#072357"
//                 d="m0 4h6v4H0zm3-3 .6498 2-1.7013-1.2361h2.103L2.3502 3z"
//               />
//             </svg>
//           </div>
//
//           <Preview.Card.Subtitle>
//             <Preview.Card.Subtitle.Text>
//               South America
//             </Preview.Card.Subtitle.Text>
//
//             <Preview.Card.Subtitle.Divider />
//
//             <div className="flex flex-row items-center">
//               <SunIcon className="size-4 text-white" />
//               <Preview.Card.Subtitle.Text>Tropical</Preview.Card.Subtitle.Text>
//             </div>
//           </Preview.Card.Subtitle>
//         </Preview.Card.Header>
//       </Preview.Card.Hero>
//
//       <Preview.Card.ControlBar>
//         <div className="z-10 flex flex-row items-center gap-2 rounded-full bg-black/50 p-2">
//           <div className="flex flex-row items-center justify-center gap-1">
//             <UserRoundIcon className="size-4 text-white" />
//             <span className="text-xs text-white">$720/mo</span>
//           </div>
//         </div>
//       </Preview.Card.ControlBar>
//
//       <Preview.Card.Details>
//         <Preview.Card.KeyFactors>
//           <Preview.Card.KeyFactors.Item>
//             <Chip fill="light" color="red" size="xs">
//               <ScaleIcon className="size-3.5" />
//               Corruption
//             </Chip>
//           </Preview.Card.KeyFactors.Item>
//
//           <Preview.Card.KeyFactors.Item>
//             <Chip fill="light" color="yellow" size="xs">
//               <HeartPulseIcon className="size-3.5" />
//               Health Care
//             </Chip>
//           </Preview.Card.KeyFactors.Item>
//
//           <Preview.Card.KeyFactors.Item>
//             <Chip fill="light" color="green" size="xs">
//               <ShieldIcon className="size-3.5" />
//               Safety
//             </Chip>
//           </Preview.Card.KeyFactors.Item>
//         </Preview.Card.KeyFactors>
//
//         <Preview.Card.Description>
//           Panama is a Central American country presented as an attractive
//           destination for foreigners, especially retirees, due to its residency
//           programs, services, and lifestyle options. With a tropical climate and
//           modern amenities, Panama offers an excellent quality of life at a
//           relatively low cost.
//         </Preview.Card.Description>
//
//         <Preview.Card.ReadMore />
//       </Preview.Card.Details>
//     </Preview.Card>
//   );
// }
//
// function PanamaCardListItem() {
//   return (
//     <List.Card>
//       <List.Card.Hero>
//         <List.Card.Image
//           alt="image"
//           src="/images/countries/panama-800-1000.jpg"
//         />
//
//         <div className="absolute inset-0 top-0 left-0 h-full w-full rounded-xl bg-linear-to-b from-black/10 to-black/60"></div>
//
//         <div className="flex flex-row items-end justify-between">
//           <List.Card.Header>
//             <div className="flex flex-row items-center justify-start gap-1">
//               <List.Card.Title>Panama</List.Card.Title>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="25"
//                 height="20"
//                 viewBox="0 0 12 8"
//               >
//                 <title>Flag of Panama</title>
//                 <path fill="#fff" d="m0 4V0h6l6 4v4H6z" />
//                 <path
//                   fill="#da121a"
//                   d="m6 0h6v4H6zm3 5L9.6498 7 7.9485 5.7639h2.103L8.3502 7z"
//                 />
//                 <path
//                   fill="#072357"
//                   d="m0 4h6v4H0zm3-3 .6498 2-1.7013-1.2361h2.103L2.3502 3z"
//                 />
//               </svg>
//             </div>
//
//             <div className="flex w-full flex-row items-center justify-between">
//               <List.Card.Subtitle>
//                 <List.Card.Subtitle.Text>South America</List.Card.Subtitle.Text>
//                 <List.Card.Subtitle.Divider />
//                 <div className="flex flex-row items-center">
//                   <SunIcon className="size-4 text-white" />
//                   <List.Card.Subtitle.Text>Tropical</List.Card.Subtitle.Text>
//                 </div>
//               </List.Card.Subtitle>
//
//               <div className="flex flex-row items-center justify-center gap-1">
//                 <StarIcon className="size-4 fill-yellow-300 stroke-yellow-300" />
//                 <StarIcon className="size-4 fill-yellow-300 stroke-yellow-300" />
//                 <StarIcon className="size-4 fill-none stroke-yellow-100" />
//               </div>
//             </div>
//           </List.Card.Header>
//
//           <div className="z-10"></div>
//         </div>
//       </List.Card.Hero>
//
//       <List.Card.ControlBar>
//         <div className="z-10 flex flex-row items-center gap-2 rounded-full bg-black/50 p-2">
//           <div className="flex flex-row items-center justify-center gap-1">
//             <UserRoundIcon className="size-4 text-white" />
//             <span className="text-xs text-white">$720/mo</span>
//           </div>
//           <List.Card.Subtitle.Divider />
//           <div className="flex flex-row items-center justify-center gap-1">
//             <UsersRoundIcon className="size-4 text-white" />
//             <span className="text-xs text-white">$2000/mo</span>
//           </div>
//         </div>
//       </List.Card.ControlBar>
//
//       <List.Card.Details>
//         <List.Card.KeyFactors>
//           <List.Card.KeyFactors.Item>
//             <Grading color="green" title="Healthcare" grade="A" />
//           </List.Card.KeyFactors.Item>
//
//           <List.Card.KeyFactors.Item>
//             <Grading color="yellow" title="Affordability" grade="C" />
//           </List.Card.KeyFactors.Item>
//
//           <List.Card.KeyFactors.Item>
//             <Grading color="red" title="Safety" grade="F" />
//           </List.Card.KeyFactors.Item>
//         </List.Card.KeyFactors>
//         <div className="h-0.5" />
//
//         <div className="flex flex-row gap-1">
//           <div className="basis-[65%]">
//             <List.Card.Description>
//               Panama is a Central American country presented as an attractive
//               destination for foreigners, especially retirees, due to its
//               residency programs, services, and lifestyle options. With a
//               tropical climate and modern amenities, Panama offers an excellent
//               quality of life at a relatively low cost.
//             </List.Card.Description>
//           </div>
//           <div className="w-px bg-neutral-100" />
//           {/* <div className="basis-[40%] rounded-2xl border-1 border-neutral-100 bg-neutral-50/25 p-1"> */}
//           <div className="basis-[35%] rounded-2xl p-1">
//             <div className="flex flex-col items-center justify-start gap-4">
//               <div className="flex flex-col items-center justify-center gap-1">
//                 <div className="flex flex-row items-center justify-center gap-1">
//                   <StarIcon className="size-3 fill-blue-600 stroke-blue-600" />
//                   <StarIcon className="size-3 fill-blue-600 stroke-blue-600" />
//                   <StarIcon className="size-3 fill-blue-600 stroke-blue-600" />
//                 </div>
//                 <span className="text-xs font-medium text-neutral-500">
//                   English Proficiency
//                 </span>
//               </div>
//
//               <div className="flex flex-col items-center justify-center gap-1">
//                 <div className="flex flex-row items-center justify-center gap-1">
//                   <StarIcon className="size-3 fill-blue-600 stroke-blue-600" />
//                   <StarIcon className="size-3 fill-blue-600 stroke-blue-600" />
//                   <StarIcon className="size-3 fill-white stroke-blue-600" />
//                 </div>
//                 <span className="text-xs font-medium text-neutral-500">
//                   Expat Friendly
//                 </span>
//               </div>
//
//               <div className="flex flex-col items-center justify-center gap-1">
//                 <div className="flex flex-row items-center justify-center gap-1">
//                   <StarIcon className="size-3 fill-blue-600 stroke-blue-600" />
//                   <StarIcon className="size-3 fill-white stroke-blue-600" />
//                   <StarIcon className="size-3 stroke-blue-600" />
//                 </div>
//                 <span className="text-xs font-medium text-neutral-500">
//                   Visa Options
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//
//         <div />
//
//         <List.Card.ReadMore />
//       </List.Card.Details>
//     </List.Card>
//   );
// }
