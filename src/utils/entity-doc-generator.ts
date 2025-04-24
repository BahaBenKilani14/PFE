import { ApiPropertyOptions } from '@nestjs/swagger';

export interface EntityDocMetadata {
  name: string;
  description?: string;
}

export interface PropertyDocOptions {
  description?: string;
  type?: string | any;
  format?: string;
  example?: any;
  enum?: any[];
  isArray?: boolean;
  required?: boolean;
  nullable?: boolean;
  default?: any;
  deprecated?: boolean;
  readOnly?: boolean;
  writeOnly?: boolean;
}

export type EntityPropertyDoc = Record<string, PropertyDocOptions>;

/**
 * Creates a map of property names to ApiProperty options for Swagger documentation
 * Use this to define documentation for entity properties
 * 
 * @example
 * const UserProperties = createPropertyDocs({
 *   id: { description: 'User ID', type: 'integer', example: 1 },
 *   email: { description: 'User email', example: 'user@example.com' },
 *   password: { description: 'User password', format: 'password', example: 'Password123!' },
 * });
 */
export function createPropertyDocs(props: EntityPropertyDoc): EntityPropertyDoc {
  return props;
}

/**
 * Basic property types with examples for documentation
 */
export const PropTypes = {
  id: { description: 'Unique identifier', type: 'integer', example: 1 },
  string: { description: 'Text value', type: 'string', example: 'Example text' },
  email: { description: 'Email address', example: 'user@example.com' },
  password: { description: 'Password', format: 'password', example: 'Password123!' },
  date: { description: 'Date and time', type: 'string', format: 'date-time', example: new Date().toISOString() },
  boolean: { description: 'True/false value', type: 'boolean', example: true },
  decimal: { description: 'Decimal number', type: 'number', format: 'float', example: 19.99 },
  integer: { description: 'Integer number', type: 'integer', example: 42 },
  address: { description: 'Physical address', example: '123 Main St, Anytown' },
  phone: { description: 'Phone number', example: '+33612345678' },
  url: { description: 'URL', example: 'https://example.com' },
}; 