drop schema jaksonlima cascade;

create schema jaksonlima;

create table jaksonlima.contract (
	id_contract uuid not null default uuid_generate_v4() primary key,
	description text,
	amount numeric,
	periods integer,
	date timestamp
);

create table jaksonlima.payment (
	id_payment uuid not null default uuid_generate_v4() primary key,
	id_contract uuid references jaksonlima.contract (id_contract),
	amount numeric,
	date timestamp
);

insert into jaksonlima.contract values ('4224a279-c162-4283-86f5-1095f559b08c', 'Prestação de serviços escolares', 6000, 12, '2024-01-01T10:00:00');
insert into jaksonlima.payment values ('7d418334-44a1-45dc-84a5-3277954bcf25', '4224a279-c162-4283-86f5-1095f559b08c', 6000, '2024-01-05T10:00:00');