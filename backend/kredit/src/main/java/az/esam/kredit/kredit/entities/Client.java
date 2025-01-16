package az.esam.kredit.kredit.entities;

import jakarta.validation.constraints.Size;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "clients")
@AllArgsConstructor
@Builder
public class Client {

    @Id
    private String id;

    @Size(max = 200)
    @Indexed(unique = true)
    private String ipAddress;
    private String uuid;
    @Size(max = 200)
    private String name;
    private boolean active;
    private Date lastCheck;
    private int receiptCount;
    private int inkCount;
    private int paperCount;
    private int moneyCount;
    private int criticalReceiptCount;
    private int criticalInkCount;
    private int criticalPaperCount;
    private int criticalMoneyCount;
    private String officeCode;
    private String posUrl;
    private String posKey;
    private String posId;
    private String hopPosId;
    private String videoId;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public Date getLastCheck() {
        return lastCheck;
    }

    public void setLastCheck(Date lastCheck) {
        this.lastCheck = lastCheck;
    }

    public int getReceiptCount() {
        return receiptCount;
    }

    public void setReceiptCount(int receiptCount) {
        this.receiptCount = receiptCount;
    }

    public int getInkCount() {
        return inkCount;
    }

    public void setInkCount(int inkCount) {
        this.inkCount = inkCount;
    }

    public int getPaperCount() {
        return paperCount;
    }

    public void setPaperCount(int paperCount) {
        this.paperCount = paperCount;
    }

    public int getMoneyCount() {
        return moneyCount;
    }

    public void setMoneyCount(int moneyCount) {
        this.moneyCount = moneyCount;
    }

    public int getCriticalReceiptCount() {
        return criticalReceiptCount;
    }

    public void setCriticalReceiptCount(int criticalReceiptCount) {
        this.criticalReceiptCount = criticalReceiptCount;
    }

    public int getCriticalInkCount() {
        return criticalInkCount;
    }

    public void setCriticalInkCount(int criticalInkCount) {
        this.criticalInkCount = criticalInkCount;
    }

    public int getCriticalPaperCount() {
        return criticalPaperCount;
    }

    public void setCriticalPaperCount(int criticalPaperCount) {
        this.criticalPaperCount = criticalPaperCount;
    }

    public int getCriticalMoneyCount() {
        return criticalMoneyCount;
    }

    public void setCriticalMoneyCount(int criticalMoneyCount) {
        this.criticalMoneyCount = criticalMoneyCount;
    }

    public String getOfficeCode() {
        return officeCode;
    }

    public void setOfficeCode(String officeCode) {
        this.officeCode = officeCode;
    }

    public String getPosUrl() {
        return posUrl;
    }

    public void setPosUrl(String posUrl) {
        this.posUrl = posUrl;
    }

    public String getPosKey() {
        return posKey;
    }

    public void setPosKey(String posKey) {
        this.posKey = posKey;
    }

    public String getVideoId() {
        return videoId;
    }

    public void setVideoId(String videoId) {
        this.videoId = videoId;
    }

    public String getPosId() {
        return posId;
    }

    public void setPosId(String posId) {
        this.posId = posId;
    }

    public String getHopPosId() {
        return hopPosId;
    }

    public void setHopPosId(String hopPosId) {
        this.hopPosId = hopPosId;
    }
}
