import { TopBar, Container, Title, Filters, ProductsGroupList } from '../../shared/components/shared'
import { Suspense } from 'react'
import { findPizzas } from '@/shared/lib';
import { GetSearchParams } from '@/shared/lib/find-pizzas';

export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {

  const categories = await findPizzas(searchParams);

  return(
    <>
      <Container className="mt-10">
        <Title text="All pizzas" size="lg" className="font-extrabold" />
      </Container>

      <TopBar 
        categories={categories.filter(category => category.products.length > 0)}
      />

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
              {
                categories.map((category) => (
                  category.products.length > 0 && (
                    <ProductsGroupList 
                      title={category.name}
                      key={category.id}
                      categoryId={category.id}
                      items={category.products} 
                    />
                  )
                ))
              }

            </div>
          </div>

        </div>
      </Container>
    </>
  )
}
