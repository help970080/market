create policy "Permitir a los usuarios ver sus propios productos"
  on "public"."products"
  as permissive
  for select
  to authenticated
  using (auth.uid() = seller_id);