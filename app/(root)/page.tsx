import { TopBar, Stories, Container, Title, Filters, ProductsGroupList } from '../../shared/components/shared'
import { Suspense } from 'react'
import { findPizzas } from '@/shared/lib';
import { GetSearchParams } from '@/shared/lib/find-pizzas';

export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {

  const categories = await findPizzas(searchParams);

  let filteredProducts = categories.map((category) => (
    category.products.length > 0 && (
      <ProductsGroupList 
        title={category.name}
        key={category.id}
        categoryId={category.id}
        items={category.products} 
      />
    )
  ))

  let allProducts = filteredProducts.every((product) => product === false) ? 
  <Title text="No products matching this request were found" size="md" className="font-extrabold text-center" /> : 
  filteredProducts

  return(
    <>
      <Container className="mt-10">
        <Title text="All pizzas" size="lg" className="font-extrabold" />
      </Container>

      <TopBar 
        categories={categories.filter(category => category.products.length > 0)}
      />

      {/* TODO: Make every story working, and make them all as slider */}
      <Stories />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">

          {/* Filters */}
          <div className="w-[250px]">
            <Suspense>
              <Filters />
            </Suspense>
          </div>

          {/* Products list */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              { allProducts }
            </div>
          </div>

        </div>
      </Container>
    </>
  )
}
