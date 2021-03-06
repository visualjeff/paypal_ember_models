ember generate model description description:string;
ember generate model details subtotal:string tax:string shipping:string;
ember generate model amount total:string currency:string details:belongs-to:details;
ember generate model transaction amount:belongs-to:amount description:belongs-to:description;
ember generate model transactions transaction:has-many; 
ember generate model billing_address line1:string city:string state:string postal_code:string country_code:string;
ember generate model credit_card number:string type:string expire_month:number expire_year:number cvv2:string first_name:string last_name:string billing_address:belongs-to:billing_address;
ember generate model funding_instrument credit_card:has-many;
ember generate model payer payment_method:string funding_instruments:has-many;
ember generate model paypal intent:string payer:belongs-to:payer transactions:has-many;
