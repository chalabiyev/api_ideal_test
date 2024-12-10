package az.esam.kredit.kredit.dtos.requests;

import lombok.Builder;

/**
 *
 * @author cihan
 */
@Builder
public class AppPageRequest {

    private int pageNumber;
    private int pageSize;
    private long offset;

    public int getPageNumber() {
        return pageNumber;
    }

    public void setPageNumber(int pageNumber) {
        this.pageNumber = pageNumber;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public long getOffset() {
        return offset;
    }

    public void setOffset(long offset) {
        this.offset = offset;
    }

}
