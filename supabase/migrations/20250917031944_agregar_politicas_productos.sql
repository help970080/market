-- Política para permitir a cualquier usuario ver los productos.
create policy "Permitir acceso publico para leer productos"
  on "public"."products"
  as permissive
  for select
  to anon, authenticated
  using (true);

-- Política para permitir que los usuarios autenticados inserten sus propios productos.
create policy "Permitir a los usuarios insertar sus propios productos"
  on "public"."products"
  as permissive
  for insert
  to authenticated
  with check (auth.uid() = seller_id);