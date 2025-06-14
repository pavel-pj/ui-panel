<script setup lang="ts">
import { computed, ref,onMounted,watch } from 'vue';
import { useHttpRequest } from '@/utils/http-request';
import {
  articleCreateURL,
  articleItemShowURL,
  updateArticleURL
} from '@/config/request-urls';
import {useRouter,useRoute} from 'vue-router';
import modalSpiner from '@/components/common/spiner/ModalSpiner.vue';
import PageSpiner from '@/components/common/spiner/PageSpiner.vue';
import BreadCrumbs from '@/components/common/navigate/BreadCrumbs.vue';
import { Form, Field } from 'vee-validate';
import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import Select from 'primevue/select';
import { useDictionariesStore } from '@/store/dictionaries';

const router = useRouter();
const route = useRoute();

type Props = {
   isEdit:boolean
};

const {
  dictionaries,
  getDictionaryByType,
  fetchDictionary
} = useDictionariesStore();



// Или альтернативный вариант:
const catalogOptions = computed(() => getDictionaryByType('catalog'));

const props = defineProps<Props>();

const itemId =  route?.params?.article_id as string;
const isSpiner = ref<boolean>(false);

const {
  data : itemData,
  //loading: isItemLoading ,
  sendRequest: getDataRequest
} = useHttpRequest<{
  id:string,
  name:string,
  title:string
  slug: string
  catalog_id: number
}>();



onMounted(async () => {
  if (!dictionaries.value) {
    await fetchDictionary('catalog');
  }
  if (props.isEdit) {
    console.log('SDFSDF');
    await fetchItemArticle();
  }

});

const fetchItemArticle = async () => {
  if (itemId) {
    await getDataRequest({ url: articleItemShowURL(itemId) });
  }
};


const {
  loading: isLoading ,
  // error ,
  sendRequest
} = useHttpRequest({
  showErrorToast:true,
  showSuccessToast:true
});




const sendData = async(data:any) => {

  isSpiner.value = true;
  const params = data;

  let res = ref<any>();

  if (!props.isEdit) {

    res.value = await sendRequest({
      url: articleCreateURL(),
      method: 'POST',
      data: params
    });


    if (res.value?.isOk) {
      await router.push('article-index');

    } else {
      isSpiner.value = false;
    }
  } else {

    res.value = await sendRequest({
      url: updateArticleURL(itemId),
      method: 'PATCH',
      data: params
    });

    if (res.value?.isOk) {
      await fetchItemArticle();
      isSpiner.value = false;
    } else {
      isSpiner.value = false;
    }

  }
};



const itemName = computed(() => itemData.value?.[0]?.name || '');

const isPageSpiner = computed(()=>{
  if (!props.isEdit) {
    return false;
  }


  return (!itemData.value && !dictionaries.value ) ? true : false;
});

const pageOptions = computed (()=>  {

  const title =ref<string>('Create new Article');
  if (props.isEdit) {
    title.value = `Edit item ${itemName.value}` ;
  }

  const buttonTitle = (props.isEdit) ? 'Update' : 'Create';

  return{
    title,
    buttonTitle
  };

});


const itemsBreadCrumbs =computed(()=>{

  return ([
    { label: 'Articles' ,route: { name: 'article-index' }  },
    { label: itemName.value }
  ]) ;
});

// Схема валидации
const schema = toTypedSchema(
  z.object({
    name: z.string()
      .min(1, '"name" is required')
      .max(255, '"name" is too long'),

    title: z.string()
      .min(1, '"title" is required')
      .max(255, '"title" is too long'),

    slug: z.string()
      .min(1, '"title" is required')
      .max(255, '"title" is too long')
      .regex(/^[a-z0-9-]+$/, 'Should have only latin letters and "-", no spaces'),

    catalog_id: z.number({
      required_error: 'Check a category',
      invalid_type_error: 'Requires to check a catalog'
    }).min(1, 'Requires to check a catalog')

  })

);

const initialValues = ref<{
  name:string  ,
  title:string  ,
  slug:string,
  catalog_id: any
}>(
  {
    name:'',
    title:'',
    slug:'',
    catalog_id: null
  }
);

watch(()=>itemData.value,
  (newValue)=>{
    if (props.isEdit && itemData.value) {
      initialValues.value.name = itemData.value.name;
      initialValues.value.title = itemData.value.title;
      initialValues.value.slug = itemData.value.slug;
      initialValues.value.catalog_id = itemData.value.catalog_id;
    }

  });


</script>

<template>

<BreadCrumbs :items="itemsBreadCrumbs" />
<PageSpiner :isSpiner="isPageSpiner" />

  <div  v-if="!isPageSpiner">
  <h1 class="text-3xl mb-12"> {{pageOptions.title}}</h1>
  <div class="w-[700px] my-6"  >

   <Form @submit="sendData"
    :validation-schema="schema"
    :initial-values="initialValues"
      class="flex flex-col gap-4 w-full ">

        <Field name="name" v-slot="{ field, errors }">
          <InputText
            v-bind="field"
            placeholder="Name"
            :class="{ 'p-invalid': errors.length }"
          />
          <Message v-if="errors.length" severity="error" size="small" variant="simple">
            {{ errors[0] }}
          </Message>
        </Field>

         <Field name="title" v-slot="{ field, errors }">
          <InputText
            v-bind="field"
            placeholder="Title"
            :class="{ 'p-invalid': errors.length }"
          />
          <Message v-if="errors.length" severity="error" size="small" variant="simple">
            {{ errors[0] }}
          </Message>
        </Field>

        <Field name="slug" v-slot="{ field, errors }">
          <InputText
            v-bind="field"
            placeholder="Slug"
            :class="{ 'p-invalid': errors.length }"
          />
          <Message v-if="errors.length" severity="error" size="small" variant="simple">
            {{ errors[0] }}
          </Message>
        </Field>

     <Field name="catalog_id" v-slot="{ field, value, errors }">
      <Select
        :modelValue="value"
        @update:modelValue="field.onChange"
        :options="catalogOptions"
        optionLabel="name"
        optionValue="code"
        placeholder="Выберите категорию"
        class="w-full"
        :class="{ 'p-invalid': errors.length }"
      />
      <Message v-if="errors.length" severity="error">
        {{ errors[0] }}
  </Message>
</Field>

      <Button type="submit"  label="Submit" class="custom-button"/>
    </Form>
  </div>
</div>
 <modalSpiner :isSpiner="isLoading" ></modalSpiner>
</template>
<style scoped>
.custom-button{
  width:250px;
}
</style>
