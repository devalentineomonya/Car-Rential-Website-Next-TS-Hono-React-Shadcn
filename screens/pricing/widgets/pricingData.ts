export const rentalPlans = [
  {
    title: "Basic",
    featured: false,
    description: "Perfect for short city trips and daily commuting",
    priceDaily: 45,
    priceWeekly: 280,
    mainFeatures: [
      { id: 1, value: "Compact & Economy Cars" },
      { id: 2, value: "200 km/day mileage" },
      { id: 3, value: "Basic Insurance Coverage" },
      { id: 4, value: "24/7 Roadside Assistance" },
    ],
  },
  {
    title: "Premium",
    featured: true,
    description: "Ideal for business trips and family vacations",
    priceDaily: 85,
    priceWeekly: 550,
    mainFeatures: [
      { id: 1, value: "SUV & Luxury Vehicles" },
      { id: 2, value: "Unlimited Mileage" },
      { id: 3, value: "Full Coverage Insurance" },
      { id: 4, value: "Free Additional Driver" },
      { id: 5, value: "Priority Service" },
      { id: 6, value: "Child Seat Included" },
    ],
  },
  {
    title: "Luxury",
    featured: false,
    description: "Premium experience for special occasions",
    priceDaily: 150,
    priceWeekly: 950,
    mainFeatures: [
      { id: 1, value: "Premium & Luxury Cars" },
      { id: 2, value: "Chauffeur Service" },
      { id: 3, value: "Airport Delivery" },
      { id: 4, value: "VIP Concierge" },
    ],
  },
];

export const rentalFeatures = [
  {
    title: "Vehicle Types",
    tiers: [
      { title: "Basic", value: "Compact/Economy" },
      { title: "Premium", featured: true, value: "SUV/Luxury" },
      { title: "Luxury", value: "Premium/Exotic" },
    ],
  },
  {
    title: "Daily Mileage",
    tiers: [
      { title: "Basic", value: "200 km/day" },
      { title: "Premium", featured: true, value: "Unlimited" },
      { title: "Luxury", value: "Unlimited" },
    ],
  },
  {
    title: "Insurance Coverage",
    tiers: [
      { title: "Basic", value: "Basic CDW" },
      { title: "Premium", featured: true, value: "Full Coverage" },
      { title: "Luxury", value: "Premium Protection" },
    ],
  },
  {
    title: "Roadside Assistance",
    tiers: [
      { title: "Basic", value: true },
      { title: "Premium", featured: true, value: true },
      { title: "Luxury", value: "VIP Support" },
    ],
  },
  {
    title: "Additional Drivers",
    tiers: [
      { title: "Basic", value: "Paid Option" },
      { title: "Premium", featured: true, value: "1 Free" },
      { title: "Luxury", value: "2 Free" },
    ],
  },
];

export const rentalPerks = [
  {
    title: "24/7 Support",
    tiers: [
      { title: "Basic", value: true },
      { title: "Premium", featured: true, value: true },
      { title: "Luxury", value: true },
    ],
  },
  {
    title: "Free Cancellation",
    tiers: [
      { title: "Basic", value: "48h notice" },
      { title: "Premium", featured: true, value: "24h notice" },
      { title: "Luxury", value: "Anytime" },
    ],
  },
  {
    title: "Loyalty Rewards",
    tiers: [
      { title: "Basic", value: "Standard" },
      { title: "Premium", featured: true, value: "Double Points" },
      { title: "Luxury", value: "Triple Points" },
    ],
  },
  {
    title: "Vehicle Delivery",
    tiers: [
      { title: "Basic", value: false },
      { title: "Premium", featured: true, value: "Airport Only" },
      { title: "Luxury", value: "Any Location" },
    ],
  },
];

export type RentalPerk = (typeof rentalPerks)[0];
export type RentalFeature = (typeof rentalFeatures)[0];
export type RentalPlan = (typeof rentalPlans)[0];
