const DOC_LIST_URL = '/api/document';

// Fetch document list
export async function fetchDocuments(
  type: string, 
  page: number = 0, 
  category: number | null = null
): Promise<DocsData> {
  const urlParams = new URLSearchParams();
  urlParams.append("type", type);
  urlParams.append("limit", "10");
  urlParams.append("direction", "DESC");
  urlParams.append("page", page.toString());

  if (category) {
    urlParams.append("og_group_ref_documentation", category.toString());
  }

  const response = await fetch(`${DOC_LIST_URL}?${urlParams.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    // Add cache headers to prevent excessive requests
    cache: 'force-cache',
    next: {
      revalidate: 300 // Revalidate every 5 minutes
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch documents: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data;
}

// Fetch single document
export async function fetchDocument(nid: string): Promise<DocItem> {
  const urlParams = new URLSearchParams();
  urlParams.append('nid', nid);

  const response = await fetch(`${DOC_LIST_URL}?${urlParams.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    // Add cache headers to prevent excessive requests
    cache: 'force-cache',
    next: {
      revalidate: 300 // Revalidate every 5 minutes
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch document: ${response.statusText}`);
  }

  const fetchedData = await response.json();

  if (!fetchedData.data?.list?.[0]) {
    throw new Error(`Document with ID ${nid} not found`);
  }

  // We'll let the client handle processing of HTML since it requires browser APIs
  return {
    nid: fetchedData.data.list[0].nid,
    url: fetchedData.data.list[0].url,
    title: fetchedData.data.list[0].title,
    body: {
      value: fetchedData.data.list[0].body.value,
    },
  };
}