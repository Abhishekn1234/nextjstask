export interface Hero {
  title: string;
  subtitle: string;
  imageUrl: string;
}

export interface About {
  heading: string;
  paragraph: string;
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface LandingContent {
  hero: Hero;
  about: About;
  testimonials: Testimonial[];
  faq: FAQ[];
}
