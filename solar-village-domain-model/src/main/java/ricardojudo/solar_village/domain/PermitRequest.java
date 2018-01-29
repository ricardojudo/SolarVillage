package ricardojudo.solar_village.domain;

import java.io.Serializable;
import java.util.Date;

public class PermitRequest implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3880057643162457575L;

	private int id;
	
	public enum Status{IN_PROGRESS,APPROVED,DENIED} 
	public enum PermitType{RESIDENTIAL_ELECTRICAL, RESIDENTIAL_STRUCTURAL}
	
	private String address;
	private Status status=Status.IN_PROGRESS;
	private PermitType permitType;
	
	private Date resolvedAt;
	private Date createdAt;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public Status getStatus() {
		return status;
	}
	public void setStatus(Status status) {
		this.status = status;
	}
	public PermitType getPermitType() {
		return permitType;
	}
	public void setPermitType(PermitType permitType) {
		this.permitType = permitType;
	}
	public Date getResolvedAt() {
		return resolvedAt;
	}
	public void setResolvedAt(Date resolvedAt) {
		this.resolvedAt = resolvedAt;
	}
	public Date getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		PermitRequest other = (PermitRequest) obj;
		if (id != other.id)
			return false;
		return true;
	}
	@Override
	public String toString() {
		return "PermitRequest [id=" + id + ", address=" + address + ", status="
				+ status + ", permitType=" + permitType + ", resolvedAt="
				+ resolvedAt + ", createdAt=" + createdAt + "]";
	}
	
	
	
}
