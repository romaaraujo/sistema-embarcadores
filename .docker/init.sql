DROP SCHEMA public;

CREATE SCHEMA public AUTHORIZATION postgres;

-- DROP TYPE public.companytype;

CREATE TYPE public.companytype AS ENUM (
	'shipper',
	'shipping');

-- DROP SEQUENCE public."Offers_id_seq";

CREATE SEQUENCE public."Offers_id_seq"
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public."ShipperShippingCompanies_id_seq";

CREATE SEQUENCE public."ShipperShippingCompanies_id_seq"
	NO MINVALUE
	NO MAXVALUE;
-- DROP SEQUENCE public."Shippers_id_seq";

CREATE SEQUENCE public."Shippers_id_seq"
	NO MINVALUE
	NO MAXVALUE;
-- DROP SEQUENCE public."ShippingCompanies_id_seq";

CREATE SEQUENCE public."ShippingCompanies_id_seq"
	NO MINVALUE
	NO MAXVALUE;
-- DROP SEQUENCE public."Users_id_seq";

CREATE SEQUENCE public."Users_id_seq"
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;-- public."Users" definition

-- Drop table

-- DROP TABLE public."Users";

CREATE TABLE public."Users" (
	id serial4 NOT NULL,
	"name" varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	CONSTRAINT "Users_email_key" UNIQUE (email),
	CONSTRAINT "Users_pkey" PRIMARY KEY (id)
);


-- public."Companies" definition

-- Drop table

-- DROP TABLE public."Companies";

CREATE TABLE public."Companies" (
	id serial4 NOT NULL,
	"type" public.companytype NULL,
	"name" varchar NOT NULL,
	CONSTRAINT company_pk PRIMARY KEY (id)
);


-- public."UserCompany" definition

-- Drop table

-- DROP TABLE public."UserCompany";

CREATE TABLE public."UserCompany" (
	"userId" int4 NOT NULL,
	"companyId" int4 NOT NULL
);
CREATE INDEX usercompany_companyid_idx ON public."UserCompany" USING btree ("companyId");
CREATE INDEX usercompany_userid_idx ON public."UserCompany" USING btree ("userId");


-- public."Offers" definition

-- Drop table

-- DROP TABLE public."Offers";

CREATE TABLE public."Offers" (
	id serial4 NOT NULL,
	"productName" varchar(255) NOT NULL,
	amount numeric NOT NULL,
	unity varchar(255) NOT NULL,
	"companyId" int4 NOT NULL,
	CONSTRAINT "Offers_pkey" PRIMARY KEY (id),
	CONSTRAINT offers_fk FOREIGN KEY ("companyId") REFERENCES public."Companies"(id)
);
CREATE INDEX offers_companyid_idx ON public."Offers" USING btree ("companyId");


-- public."Proposals" definition

-- Drop table

-- DROP TABLE public."Proposals";

CREATE TABLE public."Proposals" (
	id serial4 NOT NULL,
	"offerId" int4 NOT NULL,
	"companyId" int4 NOT NULL,
	budget numeric NOT NULL,
	amount numeric NOT NULL,
	winner bool NULL DEFAULT false,
	CONSTRAINT proposals_pk PRIMARY KEY (id),
	CONSTRAINT proposals_fk FOREIGN KEY ("companyId") REFERENCES public."Companies"(id),
	CONSTRAINT proposals_fk_1 FOREIGN KEY ("offerId") REFERENCES public."Offers"(id)
);

INSERT INTO public."Users"
(id, "name", email, "password")
VALUES(1, 'Romário 1', 'romario@teste.com', 'e7d80ffeefa212b7c5c55700e4f7193e');

INSERT INTO public."Users"
(id, "name", email, "password")
VALUES(2, 'Romário 2', 'romario2@teste.com', 'e7d80ffeefa212b7c5c55700e4f7193e');

INSERT INTO public."Companies"
(id, "type", "name")
VALUES(1, 'shipper'::public.companytype, 'Empresa 1 Shipper');

INSERT INTO public."Companies"
(id, "type", "name")
VALUES(2, 'shipping'::public.companytype, 'Empresa 2 Shipping');

INSERT INTO public."UserCompany"
("userId", "companyId")
VALUES(1, 1);

INSERT INTO public."UserCompany"
("userId", "companyId")
VALUES(2, 2);
