// types.ts
/* eslint-disable camelcase */
// 알러지 관련 타입
export interface Allergen {
  id: number;
  name: string;
  selected: boolean;
}

export type MenuItem = [string, number[]];

export interface CourseMenu {
  course_name: string;
  price: number;
  menu_list: MenuItem[];
}

export interface Restaurant {
  name: string;
  type: 'cafeteria';
  morning_menu: CourseMenu[];
  lunch_menu: CourseMenu[];
  dinner_menu: CourseMenu[];
}

export interface MenuApiResponse {
  date: string;
  fclt: Restaurant;
  west: Restaurant;
  east1: Restaurant;
  east2: Restaurant;
  emp: Restaurant;
}

export interface CafeteriaMenuItem {
  menu_name: string;
  price: number;
  allergy: number[];
}

export interface CafeteriaRestaurant {
  name: string;
  type: 'cafeteria';
  morning_menu: CafeteriaMenuItem[];
  lunch_menu: CafeteriaMenuItem[];
  dinner_menu: CafeteriaMenuItem[];
}

export interface CafeteriaApiResponse {
  date: string;
  fclt: CafeteriaRestaurant;
  west: CafeteriaRestaurant;
  east1: CafeteriaRestaurant;
  east2: CafeteriaRestaurant;
  emp: CafeteriaRestaurant;
}
/* eslint-disable camelcase */
