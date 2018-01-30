package ricardojudo.solar_village.domain;

import java.io.Serializable;

public class NewOrder implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -6825592040701582313L;
	
	enum Status {APPROVED, DENIED}
	
	private Status status;
	private String address;
	private boolean condo;
	
	private HoaMeeting hoaMeeting;
	
	private PermitRequest electricalPermit;
	private PermitRequest structuralPermit;
	public Status getStatus() {
		return status;
	}
	public void setStatus(Status status) {
		this.status = status;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public boolean isCondo() {
		return condo;
	}
	public void setCondo(boolean condo) {
		this.condo = condo;
	}
	public HoaMeeting getHoaMeeting() {
		return hoaMeeting;
	}
	public void setHoaMeeting(HoaMeeting hoaMeeting) {
		this.hoaMeeting = hoaMeeting;
	}
	public PermitRequest getElectricalPermit() {
		return electricalPermit;
	}
	public void setElectricalPermit(PermitRequest electricalPermit) {
		this.electricalPermit = electricalPermit;
	}
	public PermitRequest getStructuralPermit() {
		return structuralPermit;
	}
	public void setStructuralPermit(PermitRequest structuralPermit) {
		this.structuralPermit = structuralPermit;
	}
	@Override
	public String toString() {
		return "NewOrder [status=" + status + ", address=" + address
				+ ", condo=" + condo + "]";
	}
	
	

}
