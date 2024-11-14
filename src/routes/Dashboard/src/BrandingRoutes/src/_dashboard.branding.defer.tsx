import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { action as actionDeleteBranding, DeleteBrandingActionResponse } from './_dashboard.branding.$id.delete';
import { action as actionEditBranding, EditBrandingActionResponse } from './_dashboard.branding.$id.edit';
import { action as actionCreateBranding, CreateBrandingActionResponse } from './_dashboard.branding.api.create';
import { PageErrorBoundary } from '~/components/PageErrorBoundary/PageErrorBoundary';
import {
  defer,
  LoaderFunctionArgs,
  Navigate,
  TypedDeferredData,
  useFetcher,
  useLoaderData,
  useNavigate,
} from '~/overrides/remix';
import { useDeferData, useListingData } from '~/overrides/RemixJS/client';
import { SimpleListingResponse } from '~/overrides/RemixJS/types';
import { i18nServer } from '~/packages/common/I18n/i18n.server';
import { BrandingFormMutation } from '~/packages/specific/Branding/components/FormMutation/FormMutation';
import { FormSearchNFilter } from '~/packages/specific/Branding/components/Listing/FormSearchNFilter';
import { TableListing } from '~/packages/specific/Branding/components/Listing/TableListing';
import { RecordsPerPage } from '~/packages/specific/Branding/constants/RecordsPerPage';
import { Branding } from '~/packages/specific/Branding/models/Branding';
import { getBrandings } from '~/packages/specific/Branding/services/getBrandings';
import { getBrandingsForDefer } from '~/packages/specific/Branding/services/getBrandingsForDefer';
import { ListingSearchParams } from '~/packages/specific/Branding/types/ListingSearchParams';
import { brandingModelToDefaultValuesOfFormMutation } from '~/packages/specific/Branding/utils/brandingModelToDefaultValuesOfFormMutation';
import { lisitngUrlSearchParamsUtils } from '~/packages/specific/Branding/utils/listingUrlSearchParams';
import { getTableSortOrderMappingToServiceSort } from '~/services/utils/TableSortOrderMappingToServiceSort';
import { Button, Modal, ModalDelete, notification, useWindowReactive } from '~/shared/ReactJS';
import { updateURLSearchParamsOfBrowserWithoutNavigation } from '~/shared/Utilities';
import { fetcherFormData } from '~/utils/functions/formData/fetcherFormData';
import { handleCatchClauseAsMessage } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { preventRevalidateOnListingPage } from '~/utils/functions/preventRevalidateOnListingPage';

// @lemanh-tuong: Normal mode
// export const loader = async (
//   remixRequest: LoaderFunctionArgs,
// ): Promise<TypedResponse<{ listingResponse: SimpleListingResponse<Branding> }>> => {
//   const { request } = remixRequest;
//   const t = await i18nServer.getFixedT(request, ['common', 'branding']);
//   const { page = 1, pageSize = RecordsPerPage, search, status } = lisitngUrlSearchParamsUtils.decrypt(request);
//   const response = await getBrandingsForDefer({
//     remixRequest,
//     page,
//     pageSize,
//     searcher: {
//       status: { operator: 'eq', value: status },
//       BrandingCode: { operator: 'contains', value: search },
//       BrandingName: { operator: 'contains', value: search },
//       updatedBy: { operator: 'contains', value: search },
//     },
//     sorter: {},
//   })
//     .then(response => {
//       return {
//         info: {
//           hits: response.data.hits,
//           pagination: {
//             totalPages: response.data.pagination.totalPages,
//             totalRecords: response.data.pagination.totalRows,
//           },
//         },
//         page: Math.min(page, response.data.pagination.totalPages || 1),
//       };
//     })
//     .catch(error => {
//       return {
//         page,
//         info: {
//           hits: [],
//           pagination: { pageSize: 0, totalPages: 1, totalRecords: 0 },
//         },
//         toastMessageError: handleCatchClauseAsMessage({ error, t }),
//       };
//     });

//   return json({
//     listingResponse: response,
//   });
// };

export const loader = async (
  remixRequest: LoaderFunctionArgs,
): Promise<TypedDeferredData<{ listingResponse: Promise<SimpleListingResponse<Branding>> }>> => {
  const { request } = remixRequest;
  const t = await i18nServer.getFixedT(request, ['common', 'branding']);
  const {
    page = 1,
    pageSize = RecordsPerPage,
    search,
    status,
    brandingCode,
  } = lisitngUrlSearchParamsUtils.decrypt(request);
  const response = getBrandingsForDefer({
    remixRequest,
    page,
    pageSize,
    searcher: {
      status: { operator: 'eq', value: status },
      BrandingCode: { operator: 'contains', value: search },
      BrandingName: { operator: 'contains', value: search },
      updatedBy: { operator: 'contains', value: search },
    },
    sorter: {
      brandingCode: getTableSortOrderMappingToServiceSort(brandingCode),
    },
  })
    .then(response => {
      return {
        info: {
          hits: response.data.hits,
          pagination: {
            totalPages: response.data.pagination.totalPages,
            totalRecords: response.data.pagination.totalRows,
          },
        },
        page: Math.min(page, response.data.pagination.totalPages || 1),
      };
    })
    .catch(error => {
      return {
        page,
        info: {
          hits: [],
          pagination: { pageSize: 0, totalPages: 1, totalRecords: 0 },
        },
        toastMessageError: handleCatchClauseAsMessage({ error, t }),
      };
    });

  return defer({
    listingResponse: response,
  });
};

const FORM_UPDATE = 'FormUpdate';
const FORM_CREATE = 'FormCreate';
export const Page = () => {
  const { t } = useTranslation(['branding']);

  const navigate = useNavigate();

  //#region Listing
  const paramsInUrl = lisitngUrlSearchParamsUtils.decrypt(lisitngUrlSearchParamsUtils.getUrlSearchParams().toString());
  const loaderData = useLoaderData<typeof loader>();
  const deferData = useDeferData({ loaderData });

  const handleRequest = (params: ListingSearchParams) => {
    const searchParamsToLoader = lisitngUrlSearchParamsUtils.encrypt({
      ...paramsInUrl,
      ...params,
    });
    deferData.fetcherData.load('/branding' + searchParamsToLoader);
    updateURLSearchParamsOfBrowserWithoutNavigation(searchParamsToLoader);
  };

  const { data, isFetchingList } = useListingData({
    loaderData: deferData.data?.listingResponse,
    fetcherData: {
      data: deferData.fetcherData.data?.listingResponse,
      state: deferData.fetcherData.state,
    },
    getNearestPageAvailable: console.log,
  });
  useWindowReactive({ enabled: !isFetchingList, callback: () => handleRequest({}) });
  //#endregion

  //#region Delete
  const deleteBrandingFetcher = useFetcher<typeof actionDeleteBranding>();

  const [isOpenModalDelete, setIsOpenModalDelete] = useState<Branding | null>(null);

  const isDeleting = useMemo(() => {
    return deleteBrandingFetcher.state === 'loading' || deleteBrandingFetcher.state === 'submitting';
  }, [deleteBrandingFetcher]);

  useEffect(() => {
    if (deleteBrandingFetcher.data && deleteBrandingFetcher.state === 'idle') {
      const response = deleteBrandingFetcher.data as DeleteBrandingActionResponse;
      if (response.hasError) {
        notification.error({
          message: t('branding:delete_error').toString(),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({
          message: t('branding:delete_success').toString(),
          description: '',
        });
        handleRequest({});
        setIsOpenModalDelete(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteBrandingFetcher.state]);
  //#endregion

  //#region Create
  const createServiceFetcher = useFetcher<typeof actionCreateBranding>();

  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);

  const isCreating = useMemo(() => {
    return createServiceFetcher.state === 'loading' || createServiceFetcher.state === 'submitting';
  }, [createServiceFetcher]);

  useEffect(() => {
    if (createServiceFetcher.data && createServiceFetcher.state === 'idle') {
      const response = createServiceFetcher.data as CreateBrandingActionResponse;
      if (response.hasError) {
        notification.error({
          message: t('branding:create_error').toString(),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({
          message: t('branding:create_success').toString(),
          description: '',
        });
        handleRequest({});
        setIsOpenModalCreate(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createServiceFetcher.state]);

  //#endregion

  //#region Edit
  const editBrandingFetcher = useFetcher<typeof actionEditBranding>();

  const [isOpenModalEdit, setIsOpenModalEdit] = useState<Branding | null>(null);

  const isEdting = useMemo(() => {
    return editBrandingFetcher.state === 'loading' || editBrandingFetcher.state === 'submitting';
  }, [editBrandingFetcher]);

  useEffect(() => {
    if (editBrandingFetcher.data && editBrandingFetcher.state === 'idle') {
      const response = editBrandingFetcher.data as EditBrandingActionResponse;
      if (response.hasError) {
        notification.error({
          message: t('branding:edit_error').toString(),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({
          message: t('branding:edit_success').toString(),
          description: '',
        });
        handleRequest({});
        setIsOpenModalEdit(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editBrandingFetcher.state]);
  //#endregion

  if (deferData.isError) {
    // @lemanh-tuong: Retry & Do something else
    return <Navigate to="/500" />;
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-full flex-col gap-3">
        <Button
          block
          onClick={() => {
            getBrandings({ page: 1, pageSize: 10, searcher: {}, sorter: {} }).then(console.log);
          }}
        >
          Fetch client & auto refresh token at server
        </Button>
        <Button onClick={() => navigate('/branding/create')} color="primary">
          Create new but in a page
        </Button>
        <FormSearchNFilter
          defaultValues={{
            search: paramsInUrl.search,
            status: paramsInUrl.status,
          }}
          onRefresh={() => handleRequest({})}
          onChange={values => {
            handleRequest({
              ...values,
              status: values.status,
              search: values.search,
              page: 1,
            });
          }}
        />
        <TableListing
          loading={isFetchingList}
          currentPage={data?.page}
          pageSize={paramsInUrl.pageSize ?? RecordsPerPage}
          totalRecords={data?.info.pagination.totalRecords}
          data={data?.info.hits}
          sortValues={{
            brandingCode: { order: paramsInUrl.brandingCode, priority: undefined },
          }}
          onSortChange={({ brandingCode }) => handleRequest({ brandingCode: brandingCode?.order })}
          onPaginationChange={({ page, pageSize }) => handleRequest({ page, pageSize })}
          onCreate={() => setIsOpenModalCreate(true)}
          onEdit={record => setIsOpenModalEdit(record)}
          onDelete={record => setIsOpenModalDelete(record)}
        />
      </div>
      <Modal
        open={!!isOpenModalEdit}
        title={t('branding:edit_title').toString()}
        confirmLoading={isEdting}
        okButtonProps={{ form: FORM_UPDATE, htmlType: 'submit' }}
        onCancel={() => setIsOpenModalEdit(null)}
        onOk={() => undefined}
      >
        <BrandingFormMutation
          // statusUpdatable
          fieldsError={editBrandingFetcher.data?.fieldsError}
          uid={FORM_UPDATE}
          defaultValues={brandingModelToDefaultValuesOfFormMutation({ branding: isOpenModalEdit ?? undefined })}
          onSubmit={values => {
            editBrandingFetcher.submit(fetcherFormData.encrypt(values), {
              method: 'put',
              action: `/branding/${isOpenModalEdit?._id}/edit`,
            });
          }}
          isSubmiting={isEdting}
        />
      </Modal>

      <Modal
        open={isOpenModalCreate}
        title={t('branding:create_title').toString()}
        confirmLoading={isCreating}
        okButtonProps={{ form: FORM_CREATE, htmlType: 'submit' }}
        onCancel={() => setIsOpenModalCreate(false)}
        okText={t('branding:create')}
        onOk={() => undefined}
      >
        <BrandingFormMutation
          fieldsError={createServiceFetcher.data?.fieldsError}
          uid={FORM_CREATE}
          defaultValues={brandingModelToDefaultValuesOfFormMutation({ branding: undefined })}
          onSubmit={values => {
            createServiceFetcher.submit(fetcherFormData.encrypt(values), {
              method: 'post',
              action: '/branding/api/create',
            });
          }}
          isSubmiting={isCreating}
        />
      </Modal>

      <ModalDelete
        open={!!isOpenModalDelete}
        title={t('branding:delete_title').toString()}
        description={t('branding:delete_description').toString()}
        confirmLoading={isDeleting}
        onCancel={() => setIsOpenModalDelete(null)}
        onOk={() => {
          deleteBrandingFetcher.submit({}, { method: 'delete', action: `/branding/${isOpenModalDelete?._id}/delete` });
        }}
      />
    </div>
  );
};

export const shouldRevalidate = preventRevalidateOnListingPage;

export const ErrorBoundary = PageErrorBoundary;

export default Page;
