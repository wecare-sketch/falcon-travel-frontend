import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { toast } from "react-hot-toast";

interface DownloadInvoiceParams {
  eventSlug: string;
}

export const useDownloadInvoice = () => {
  const role = useSelector((state: RootState) => state.userRole.role);

  const downloadInvoice = async ({ eventSlug }: DownloadInvoiceParams) => {

    try {
      const endpoint = role === "admin" 
        ? `/admin/event/invoice/${eventSlug}`
        : `/user/event/invoice/${eventSlug}`;

      const response = await axiosInstance.get(endpoint, {
        responseType: "blob", // Important for file downloads
        timeout: 30000, // 30 second timeout for large files
        headers: {
          Accept: "application/pdf, application/octet-stream, */*",
        },
      });
      
      // Type assertion for blob response
      const blobData = response.data as Blob;
     

      // Validate content type
      const contentType = response.headers["content-type"];
      if (!contentType || (!contentType.includes("pdf") && !contentType.includes("application/octet-stream"))) {
        console.warn("Unexpected content type:", contentType);
        // Still proceed with download as some servers might not set content-type correctly
      }
      


      // Create a blob from the response data
      const blob = new Blob([blobData], {
        type: contentType || "application/pdf",
      });

      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      
      // Set filename from response headers or default
      const contentDisposition = response.headers["content-disposition"];
      let filename = "invoice.pdf";
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
        if (filenameMatch && filenameMatch[1]) {
          filename = filenameMatch[1].replace(/['"]/g, "");
        }
      }
      
      // Fallback filename with event slug if no filename from headers
      if (filename === "invoice.pdf" && eventSlug) {
        filename = `invoice-${eventSlug}.pdf`;
      }
      
      link.download = filename;
      link.style.display = "none"; // Hide the link element
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
   


      return response.data;
    } catch (error: Error | unknown) {
      console.error("Error downloading invoice:", error);
    }
  };

  return useMutation({
    mutationFn: downloadInvoice,
    onSuccess: () => {
      toast.success("Invoice downloaded successfully!");
    },
    onError: (error: Error | unknown) => {
      console.error("Failed to download invoice:", error);
    },
  });
};
