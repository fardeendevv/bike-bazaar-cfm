import imgCdiUnit from '../assets/images/moto_cdi_unit_1790978773339.jpg';
import imgBattery from '../assets/images/moto_battery_1790978762584.jpg';
import imgSparkPlug from '../assets/images/moto_spark_plug_1790978708184.jpg';
import imgCarburetor from '../assets/images/moto_carburetor_1790978653409.jpg';
import imgClutchPlates from '../assets/images/moto_clutch_plates_1790978742394.jpg';
import imgDiscBrake from '../assets/images/moto_disc_brake_1790978679295.jpg';
import imgFuelTank from '../assets/images/moto_fuel_tank_1790978667006.jpg';
import imgHeadlight from '../assets/images/moto_headlight_1790978729208.jpg';
import imgWheelRim from '../assets/images/moto_wheel_rim_1790978689522.jpg';
import imgAirFilter from '../assets/images/moto_air_filter_1790978795381.jpg';

export interface Product {
  id: string;
  name: string;
  sku: string;
  section: 'Section A' | 'Section B';
  category: string;
  price: number;
  oldPrice?: number;
  stock: number;
  badge?: string;
  imageUrl: string;
  description: string;
  compatibleBikes: string;
  rating: number;
  reviewsCount: number;
}

export const DEFAULT_PRODUCTS: Product[] = [
  // ================= SECTION A (5 Products) =================
  // Category 1: Electrical System & Electronics
  {
    id: 'bb-01',
    name: 'CDI Unit / ECU Racing Module',
    sku: 'BB-CDI-001',
    section: 'Section A',
    category: 'Electrical System & Electronics',
    price: 2800,
    oldPrice: 3200,
    stock: 25,
    badge: 'HOT SALE',
    imageUrl: imgCdiUnit,
    description: 'Microprocessor-controlled ignition timing module with wiring harness plug for instant cold starts and smoother throttle response.',
    compatibleBikes: 'Honda CG125, CD70 Euro II',
    rating: 4.9,
    reviewsCount: 52
  },
  {
    id: 'bb-02',
    name: 'Battery (Dry Maintenance-Free 12V 5Ah)',
    sku: 'BB-BAT-002',
    section: 'Section A',
    category: 'Electrical System & Electronics',
    price: 3800,
    oldPrice: 4300,
    stock: 20,
    badge: 'SALE 12%',
    imageUrl: imgBattery,
    description: 'Factory-sealed AGM non-spillable 12V motorcycle battery with heavy-duty terminals and 6-month replacement warranty.',
    compatibleBikes: 'Universal 125cc & 150cc Bikes',
    rating: 4.8,
    reviewsCount: 88
  },
  {
    id: 'bb-03',
    name: 'Spark Plug & Waterproof Plug Cap',
    sku: 'BB-PLG-003',
    section: 'Section A',
    category: 'Electrical System & Electronics',
    price: 650,
    stock: 100,
    badge: 'GENUINE OEM',
    imageUrl: imgSparkPlug,
    description: 'Nickel-alloy electrode spark plug with triple ceramic insulator and heat-resistant silicone suppressor cap.',
    compatibleBikes: 'Honda CD70, CG125, Pridor, Yamaha YBR',
    rating: 4.9,
    reviewsCount: 164
  },

  // Category 2: Engine Components
  {
    id: 'bb-04',
    name: 'Carburetor / Fuel Injector Unit (24mm)',
    sku: 'BB-CAR-004',
    section: 'Section A',
    category: 'Engine Components',
    price: 4200,
    oldPrice: 4800,
    stock: 14,
    badge: 'JAPAN SPEC',
    imageUrl: imgCarburetor,
    description: 'Precision-tuned Japanese jetting slide carburetor with brass fuel mixture adjusters for optimal mileage and power.',
    compatibleBikes: 'Honda CG125 & Yamaha YBR 125',
    rating: 4.9,
    reviewsCount: 65
  },
  {
    id: 'bb-05',
    name: 'Clutch Plates & Pressure Plates (5-Disc Set)',
    sku: 'BB-CLT-005',
    section: 'Section A',
    category: 'Engine Components',
    price: 2400,
    stock: 30,
    badge: 'KEVLAR BLEND',
    imageUrl: imgClutchPlates,
    description: 'High-friction kevlar blend clutch plates paired with tempered steel pressure discs for zero slippage under heavy load.',
    compatibleBikes: 'Honda CG125, CD70, Suzuki GS150',
    rating: 4.9,
    reviewsCount: 92
  },

  // Category 3: Brake System
  {
    id: 'bb-06',
    name: 'Brake Disc Rotor & Dual-Piston Caliper',
    sku: 'BB-BRK-006',
    section: 'Section A',
    category: 'Brake System',
    price: 6500,
    stock: 4,
    badge: 'LIMITED STOCK',
    imageUrl: imgDiscBrake,
    description: '245mm cross-drilled stainless steel ventilated brake rotor paired with a pre-loaded hydraulic dual-piston caliper.',
    compatibleBikes: 'Yamaha YBR 125G & Suzuki GS150 SE',
    rating: 4.9,
    reviewsCount: 37
  },

  // ================= SECTION B (4 Products) =================
  // Category 4: Suspension, Frame & Body Parts
  {
    id: 'bb-07',
    name: 'Fuel Tank & Chrome Lock Cap Assembly',
    sku: 'BB-TNK-007',
    section: 'Section B',
    category: 'Suspension, Frame & Body Parts',
    price: 7500,
    oldPrice: 8500,
    stock: 6,
    badge: 'OEM PAINT',
    imageUrl: imgFuelTank,
    description: 'Deep-pressed heavy gauge steel petrol tank with anti-rust inner lining, automotive clearcoat gloss, and chrome cap.',
    compatibleBikes: 'Honda CG125 & CD70',
    rating: 4.8,
    reviewsCount: 41
  },
  {
    id: 'bb-08',
    name: 'Headlight & Turn Indicator Assembly',
    sku: 'BB-LGT-008',
    section: 'Section B',
    category: 'Suspension, Frame & Body Parts',
    price: 3200,
    stock: 18,
    badge: 'CHROME RING',
    imageUrl: imgHeadlight,
    description: 'Multi-reflector crystal glass headlight dome with triple-chrome bezel and flexible amber turn signal indicators.',
    compatibleBikes: 'Honda CD70, CG125 & Suzuki GS150',
    rating: 4.7,
    reviewsCount: 31
  },

  // Category 5: Transmission, Wheels & Drive Chain
  {
    id: 'bb-09',
    name: 'Chrome Spoke Wheel Rim & Tire Set',
    sku: 'BB-RIM-009',
    section: 'Section B',
    category: 'Transmission, Wheels & Drive Chain',
    price: 6500,
    stock: 10,
    badge: 'HEAVY GAUGE',
    imageUrl: imgWheelRim,
    description: 'Double-walled chrome steel spoke wheel rim mounted with a 6-ply deep-tread motorcycle tire for all-weather grip.',
    compatibleBikes: 'Honda CG125 (18-inch) & CD70',
    rating: 4.9,
    reviewsCount: 49
  },

  // Category 6: Consumables & Accessories
  {
    id: 'bb-10',
    name: 'High-Flow Air Filter & Oil Filter Set',
    sku: 'BB-FLT-010',
    section: 'Section B',
    category: 'Consumables & Accessories',
    price: 700,
    oldPrice: 900,
    stock: 70,
    badge: 'BEST SELLER',
    imageUrl: imgAirFilter,
    description: 'Dual-stage polyurethane foam air cleaner element paired with a fine mesh oil filter for maximum engine protection.',
    compatibleBikes: 'Honda CD70, CG125, Yamaha YBR 125',
    rating: 4.8,
    reviewsCount: 112
  }
];

export const CATEGORIES_SECTION_A = [
  'Electrical System & Electronics',
  'Engine Components',
  'Brake System'
];

export const CATEGORIES_SECTION_B = [
  'Suspension, Frame & Body Parts',
  'Transmission, Wheels & Drive Chain',
  'Consumables & Accessories'
];
