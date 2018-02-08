package ricardojudo.solar_village.domain;

import java.io.Serializable;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Random;

import com.fasterxml.jackson.annotation.JsonProperty;

import ricardojudo.solar_village.domain.PermitRequest.PermitType;

public class NewOrder implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -6825592040701582313L;

	enum ProcessStatus {
		NEW, IN_HOA_MEETING, REQ_GOV_PERMITS, COMPLETED
	}

	private static Random random = new Random();

	private Integer id;
	private ProcessStatus status = ProcessStatus.NEW;
	private String address;
	private boolean condo;

	private boolean approved;

	private HoaMeeting hoaMeeting;

	private List<PermitRequest> govermentPermits = new ArrayList<>(5);

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public ProcessStatus getStatus() {
		return status;
	}

	public void setStatus(ProcessStatus status) {
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

	public boolean isApproved() {
		return approved;
	}

	public void setApproved(boolean approved) {
		this.approved = approved;
	}

	public HoaMeeting getHoaMeeting() {
		return hoaMeeting;
	}

	public void setHoaMeeting(HoaMeeting hoaMeeting) {
		this.hoaMeeting = hoaMeeting;
	}

	

	@Override
	public String toString() {
		return "NewOrder [id=" + id + ", status=" + status + ", address="
				+ address + ", condo=" + condo + ", approved=" + approved
				+ ", hoaMeeting=" + hoaMeeting + ", govermentPermits="
				+ govermentPermits + "]";
	}

	@JsonProperty("approved_by_hoa")
	public void approvedByHoa() {
		if(hoaMeeting!=null)
			hoaMeeting.setApproved(Boolean.TRUE);
	}

	@JsonProperty("is_approved_by_hoa")
	public boolean isApprovedByHoa() {
		return hoaMeeting != null && hoaMeeting.isApproved();
	}

	// State quetions

	// State transitions

	public void complete() {
		boolean _tmp = true;

		if (condo && hoaMeeting != null) {
			_tmp = hoaMeeting.isApproved();
		}

		for (PermitRequest permitRequest : govermentPermits) {
			_tmp = _tmp && permitRequest.isApproved();
			if (permitRequest.isDenied())
				break;
		}
		approved =  _tmp;
		status = ProcessStatus.COMPLETED;
	}

	public boolean isNew() {
		return ProcessStatus.NEW.equals(status);
	}

	public boolean isCompleted() {
		return ProcessStatus.COMPLETED.equals(status);
	}

	// Permits
	public boolean add(PermitRequest e) {
		return govermentPermits.add(e);
	}

	public boolean remove(PermitRequest o) {
		return govermentPermits.remove(o);
	}
	
	
	

	public List<PermitRequest> getGovermentPermits() {
		return Collections.unmodifiableList(govermentPermits);
	}

	public static NewOrder getInstance() {
		NewOrder newOrder = new NewOrder();
		newOrder.setId(Math.abs(random.nextInt()));
		return newOrder;
	}

	public static NewOrder getCondominiumInstance(Date meetingDate) {
		NewOrder newOrder = getInstance();
		newOrder.setCondo(true);
		HoaMeeting hoaMeeting = new HoaMeeting();
		hoaMeeting.setDate(meetingDate);
		newOrder.setHoaMeeting(hoaMeeting);
		return newOrder;
	}

	public static NewOrder getCondominiumInstance(String meetingDate)
			throws ParseException {
		NewOrder newOrder = getInstance();
		newOrder.setCondo(true);
		HoaMeeting hoaMeeting = new HoaMeeting();
		hoaMeeting.setDate(meetingDate);
		newOrder.setHoaMeeting(hoaMeeting);
		return newOrder;
	}

	public PermitRequest buildPermitRequest(PermitType permitType) {
		PermitRequest permitRequest = new PermitRequest();
		permitRequest.setAddress(address);
		permitRequest.setPermitType(permitType);
		govermentPermits.add(permitRequest);
		return permitRequest;
	}

}
