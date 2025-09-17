create policy "Permitir a los usuarios insertar sus propios productos"
  on "public"."products"
  as permissive
  for insert
  to authenticated
  with check (auth.uid() = seller_id);