package ricardojudo.solar_village.domain;

import java.io.Serializable;
import java.util.Date;

import ricardojudo.solar_village.domain.json.PermitTypeDeserializer;
import ricardojudo.solar_village.domain.json.StatusDeserializer;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

public class PermitRequest implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3880057643162457575L;

	private int id;

	@JsonDeserialize(using = StatusDeserializer.class)
	public enum Status {
		IN_PROGRESS, APPROVED, DENIED;
	}

	@JsonDeserialize(using = PermitTypeDeserializer.class)
	public enum PermitType {
		RESIDENTIAL_ELECTRIC, RESIDENTIAL_STRUCTURAL;
	}

	private String address;
	private Status status = Status.IN_PROGRESS;
	
	@JsonProperty("permit_type")
	private PermitType permitType;
	
	@JsonProperty("resolved_at")
	private Date resolvedAt;
	
	@JsonProperty("created_at")
	private Date createdAt;
	
	@JsonProperty("updated_at")
	private Date updatedAt;

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
	
	public boolean isInProgress() {
		return Status.IN_PROGRESS.equals(this.status);
	}

	public boolean isApproved() {
		return Status.APPROVED.equals(this.status);
	}

	public boolean isDenied() {
		return Status.DENIED.equals(this.status);
	}

	@Override
	public String toString() {
		return "PermitRequest [id=" + id + ", address=" + address + ", status="
				+ status + ", permitType=" + permitType + ", resolvedAt="
				+ resolvedAt + ", createdAt=" + createdAt + "]";
	}	

}
