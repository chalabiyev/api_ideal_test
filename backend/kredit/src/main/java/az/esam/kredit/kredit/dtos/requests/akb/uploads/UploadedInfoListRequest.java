package az.esam.kredit.kredit.dtos.requests.akb.uploads;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class UploadedInfoListRequest {
    private String page; // page=0
    private String size; // size=10
    private String sort; // sort=createdDate,desc

    private String btcStatusLvl;
    private String createdDate;  // tarix aralığı “2021-03-15,2021-03-28” formatında olmalıdır
    private String fileName; //x%C9%99t
    private String fileReportingDate; // 05%2F03%2F2021
}
