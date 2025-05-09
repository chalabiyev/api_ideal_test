package az.esam.kredit.kredit.services.excel;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.apache.pdfbox.multipdf.Splitter;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPageTree;
import org.springframework.stereotype.Service;

import com.google.common.io.Files;
import com.sun.star.beans.PropertyValue;
import com.sun.star.beans.XPropertySet;
import com.sun.star.container.XIndexAccess;
import com.sun.star.container.XNameAccess;
import com.sun.star.frame.XComponentLoader;
import com.sun.star.frame.XStorable;
import com.sun.star.lang.XComponent;
import com.sun.star.style.XStyle;
import com.sun.star.style.XStyleFamiliesSupplier;
import com.sun.star.uno.UnoRuntime;
import com.sun.star.uno.XComponentContext;

import lombok.extern.slf4j.Slf4j;
import ooo.connector.BootstrapSocketConnector;

@Service
@Slf4j
public class ExcelService {

    public boolean convertToPdf(String inputFile, String tempPdfFile, String outputFile, int zaminCount) {
        try {
            log.info("convertToPdf started inputFile:" + inputFile + " outputFile:" + outputFile);
            XComponentContext xContext = BootstrapSocketConnector.bootstrap("/usr/lib/libreoffice/program/");
            XComponentLoader xComponentLoader = UnoRuntime.queryInterface(
                    XComponentLoader.class,
                    xContext.getServiceManager()
                            .createInstanceWithContext("com.sun.star.frame.Desktop", xContext));
            // Dosya yolları
            String inputPath = new File(inputFile).getAbsolutePath();
            String tempOutputPath = new File(tempPdfFile).getAbsolutePath();
            String outputPath = new File(outputFile).getAbsolutePath();

            String loadUrl = "file:///" + inputPath.replace("\\", "/");
            String storeUrl = "file:///" + tempOutputPath.replace("\\", "/");

            // Belgeyi yükle
            PropertyValue[] loadProps = new PropertyValue[0];
            XComponent document = xComponentLoader.loadComponentFromURL(loadUrl, "_blank", 0, loadProps);

            // Sayfa kenarlıklarını ayarla (5mm = 5000 µm)
            setPageMargins(document, 300); // µm cinsinden değer veriliyor

            // PDF olarak kaydet
            XStorable xStorable = UnoRuntime.queryInterface(XStorable.class, document);
            PropertyValue[] storeProps = new PropertyValue[1];
            storeProps[0] = new PropertyValue();
            storeProps[0].Name = "FilterName";
            storeProps[0].Value = "calc_pdf_Export"; // Excel için PDF filter

            log.info("PDF'e dönüştürülüyor...");
            xStorable.storeToURL(storeUrl, storeProps);

            // Belgeyi kapat
            document.dispose();
            log.info("İşlem tamamlandı: " + tempOutputPath);
            Thread.sleep(2000);
            removeFirstPage(tempOutputPath, outputPath, zaminCount);
            return true;
        } catch (Exception e) {
            log.error("Hata", e);
            return false;
        }
    }

    public void setPageMargins(XComponent document, int marginValueInMicrometers) throws Exception {
        XStyleFamiliesSupplier xSupplier = UnoRuntime.queryInterface(XStyleFamiliesSupplier.class, document);
        Object styleFamiliesObj = xSupplier.getStyleFamilies();
        XNameAccess xStyleFamilies = UnoRuntime.queryInterface(XNameAccess.class, styleFamiliesObj);

        Object pageStylesObj = xStyleFamilies.getByName("PageStyles");
        XIndexAccess xPageStyles = UnoRuntime.queryInterface(XIndexAccess.class, pageStylesObj);

        for (int i = 0; i < xPageStyles.getCount(); i++) {
            Object pageStyleObj = xPageStyles.getByIndex(i);
            XStyle xPageStyle = UnoRuntime.queryInterface(XStyle.class, pageStyleObj);

            XPropertySet xPropSet = UnoRuntime.queryInterface(XPropertySet.class, xPageStyle);

            // Sol, Sağ, Üst, Alt kenarlıklar
            xPropSet.setPropertyValue("LeftMargin", Integer.valueOf(marginValueInMicrometers));
            xPropSet.setPropertyValue("RightMargin", Integer.valueOf(marginValueInMicrometers));
            xPropSet.setPropertyValue("TopMargin", Integer.valueOf(marginValueInMicrometers));
            xPropSet.setPropertyValue("BottomMargin", Integer.valueOf(marginValueInMicrometers));
        }
    }

    public void removeFirstPage(String inputPdfPath, String outputPdfPath, int zaminCount)
            throws IOException {
        // PDF belgesini yükle
        PDDocument document = PDDocument.load(new File(inputPdfPath));

        // Splitter ile sayfaları ayır
        Splitter splitter = new Splitter();
        List<PDDocument> pages = splitter.split(document);

        if (pages.size() > 1) {
            // İlk sayfayı atla ve diğerlerini yeni bir PDF'de birleştir
            PDDocument resultDoc = new PDDocument();
            PDPageTree allPages = resultDoc.getPages();

            for (int i = 2; i < pages.size(); i++) {
                boolean canCreate = true;// i != 13;
                if (canCreate && i == 10 && zaminCount == 0) {
                    canCreate = false;
                }
                if (canCreate && i == 11 && zaminCount < 2) {
                    canCreate = false;
                }
                if (canCreate) {
                    PDDocument pageDoc = pages.get(i);
                    allPages.add(pageDoc.getPage(0));
                }
            }
            // Yeni PDF'yi kaydet
            resultDoc.save(outputPdfPath);
            resultDoc.close();
            log.info("İlk sayfa çıkarıldı: " + outputPdfPath);
        } else {
            log.info("PDF sadece 1 sayfadan oluşuyor.");
        }
        document.close();
    }

}
