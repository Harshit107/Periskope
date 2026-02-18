export type WhatsAppGroup = {
  id: string;
  phone_number: string;
  group_name: string;
  project: string;
  labels: string[];
  members: number;
  last_active: string;
  created_at: string;
  unreadCount?: number;
};
