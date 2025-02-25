import TextInput from "@/components/form/TextInput";
import SelectInput from "@/components/form/SelectInput";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import { createProductAction } from "@/utils/actions";
import ImageInput from "@/components/form/ImageInput";
import PriceInput from "@/components/form/PriceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import { faker } from "@faker-js/faker";
import CheckboxInput from "@/components/form/CheckboxInput";

// function moved to /utils/actions.ts. Now importing
// const createProductAction = async (formData: FormData) => {
//   "use server";
//   const name = formData.get("name") as string;
//   console.log(name);
// };

function CreateProduct() {
  const name = faker.commerce.productName();
  const company = faker.company.name();
  // const description = faker.commerce.productDescription();
  const description = faker.lorem.paragraph({ min: 10, max: 12 });
  const shortDescription = faker.lorem.paragraph({ min: 1, max: 2 });

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">create product</h1>
      <div className="border p-8 rounded-md">
        <FormContainer action={createProductAction}>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <TextInput
              type="text"
              name="name"
              label="product name"
              defaultValue={name}
            />
            <TextInput
              type="text"
              name="company"
              label="company"
              defaultValue={company}
            />

            <PriceInput />
            <ImageInput />
          </div>
          <TextAreaInput
            name="shortDescription"
            labelText="short product description"
            defaultValue={shortDescription}
            rows="2"
          />
          <TextAreaInput
            name="description"
            labelText="product description"
            defaultValue={description}
            rows="5"
          />
          {/* Enhancement: add way to add manual product options like flavors with name, priceChange, farmId, id (created automatically). These will need to create a new Option model and assign it to the option array for the product */}
          <div className="mt-6">
            <CheckboxInput
              name="experience"
              label="experience - product is an on location experience"
            />
          </div>
          <div className="mt-6">
            <CheckboxInput
              name="featured"
              label="feature - product included in home page product carousel"
            />
          </div>
          <div className="mt-6">
            <CheckboxInput
              name="siteSpecial"
              label="Site Special - Product highlighted in Site Special | Hero. 1 product Only"
            />
          </div>
          {/* <h1 className="text-2xl font-semibold mb-2 capitalize mt-10">product metadata</h1> */}
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <SelectInput
              type="select"
              name="type"
              label="Product Type"
              defaultValue="product"
              item1="appointmentRequiredTicket"
              item2="product"
              item3="subscription "
              item4="ticket"
            />
            <SelectInput
              type="select"
              name="productCategory"
              label="Product Category"
              defaultValue="eggs"
              item1="dairy"
              item2="eggs"
              item3="flowers"
            />
          </div>
          <SubmitButton text="Create Product" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  );
}
export default CreateProduct;
