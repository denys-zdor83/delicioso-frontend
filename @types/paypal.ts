export type PaymentData = {
  id: string;
  status: string;
  links: Link[];
}

export type Link = {
  href: string;
  rel: 'self' | 'approve' | 'update' | 'capture';
  method: string;
}