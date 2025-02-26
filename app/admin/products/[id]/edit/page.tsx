import {
  fetchAdminProductDetails,
  updateProductAction,
  updateProductImageAction,
} from "@/utils/actions";
import FormContainer from "@/components/form/FormContainer";
import ImageInputContainer from "@/components/form/ImageInputContainer";
import TextInput from "@/components/form/TextInput";
import SelectInput from "@/components/form/SelectInput";
import PriceInput from "@/components/form/PriceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import { SubmitButton } from "@/components/form/Buttons";
import CheckboxInput from "@/components/form/CheckboxInput";

async function EditProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const product = await fetchAdminProductDetails(id);
  const {
    name,
    company,
    description,
    shortDescription,
    experience,
    siteSpecial,
    featured,
    price,
  } = product;
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">update product</h1>
      <div className="border p-8 rounded-md">
        {/* Image Input Container */}
        <ImageInputContainer
          action={updateProductImageAction}
          name={name}
          image={product.image}
          text="update image"
        >
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="url" value={product.image} />
        </ImageInputContainer>

        <FormContainer action={updateProductAction}>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <input type="hidden" name="id" value={id} />

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

            <PriceInput defaultValue={price} />
            {/* <ImageInput /> */}
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
              defaultChecked={experience}
            />
          </div>
          <div className="mt-6">
            <CheckboxInput
              name="featured"
              label="feature - product included in home page product carousel"
              defaultChecked={featured}
            />
          </div>
          <div className="mt-6">
            <CheckboxInput
              name="siteSpecial"
              label="Site Special - Product highlighted in Site Special | Hero. 1 product Only"
              defaultChecked={siteSpecial}
            />
          </div>
          {/* <h1 className="text-2xl font-semibold mb-2 capitalize mt-10">product metadata</h1> */}
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <SelectInput
              // type="select"
              name="type"
              label="Product Type"
              defaultValue="product"
              item1="appointmentRequiredTicket"
              item2="product"
              item3="subscription "
              item4="ticket"
            />
            <SelectInput
              // type="select"
              name="productCategory"
              label="Product Category"
              defaultValue="eggs"
              item1="dairy"
              item2="eggs"
              item3="flowers"
            />
          </div>
          <SubmitButton text="update product" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  );
}
export default EditProductPage;
