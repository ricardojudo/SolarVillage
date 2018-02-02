package ricardojudo.solar_village.domain;

import static org.testng.Assert.*;

import java.io.IOException;

import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class PermitRequestTest {

	private ObjectMapper mapper;

	@BeforeTest
	public void setUpBefore() {
		mapper = new ObjectMapper();
	}

	@Test
	public void testJsonMarshallingRequest() throws JsonProcessingException {
		PermitRequest permitRequest = new PermitRequest();
		permitRequest.setAddress("Calle falsa 123");

		String value = mapper.writeValueAsString(permitRequest);
		boolean contains = value.contains("\"address\":\"Calle falsa 123\""); 
		assertTrue(contains);
	}

	@Test
	public void testJsonMarshallingResponseInProgress() throws JsonParseException, JsonMappingException, IOException {
		String json = "{\"id\":1,\"address\":\"Calle falsa 123\",\"status\":\"in_progress\",\"permit_type\":\"residential_electric\",\"resolved_at\":\"2018-01-26T06:43:46.859Z\",\"created_at\":\"2018-01-26T05:44:46.796Z\",\"updated_at\":\"2018-01-26T06:43:46.861Z\"}";
		PermitRequest permitRequest = mapper.readValue(json, PermitRequest.class);
		assertEquals(PermitRequest.Status.IN_PROGRESS, permitRequest.getStatus());
	}

	@Test
	public void testJsonMarshallingResponseInApproved() throws JsonParseException, JsonMappingException, IOException {
		String json = "{\"id\":1,\"address\":\"Calle falsa 123\",\"status\":\"approved\",\"permit_type\":\"residential_electric\",\"resolved_at\":\"2018-01-26T06:43:46.859Z\",\"created_at\":\"2018-01-26T05:44:46.796Z\",\"updated_at\":\"2018-01-26T06:43:46.861Z\"}";
		PermitRequest permitRequest = mapper.readValue(json, PermitRequest.class);
		assertEquals(PermitRequest.Status.APPROVED, permitRequest.getStatus());
	}

	@Test
	public void testJsonMarshallingResponseInDenied() throws JsonParseException, JsonMappingException, IOException {
		String json = "{\"id\":1,\"address\":\"Calle falsa 123\",\"status\":\"denied\",\"permit_type\":\"residential_electric\",\"resolved_at\":\"2018-01-26T06:43:46.859Z\",\"created_at\":\"2018-01-26T05:44:46.796Z\",\"updated_at\":\"2018-01-26T06:43:46.861Z\"}";
		PermitRequest permitRequest = mapper.readValue(json, PermitRequest.class);
		assertEquals(PermitRequest.Status.DENIED, permitRequest.getStatus());
	}

	@Test
	public void testJsonMarshallingResponseInElectricalType() throws JsonParseException, JsonMappingException, IOException {
		String json = "{\"id\":1,\"address\":\"Calle falsa 123\",\"status\":\"denied\",\"permit_type\":\"residential_electric\",\"resolved_at\":\"2018-01-26T06:43:46.859Z\",\"created_at\":\"2018-01-26T05:44:46.796Z\",\"updated_at\":\"2018-01-26T06:43:46.861Z\"}";
		PermitRequest permitRequest = mapper.readValue(json, PermitRequest.class);
		assertEquals(PermitRequest.PermitType.RESIDENTIAL_ELECTRIC, permitRequest.getPermitType());
	}

	@Test
	public void testJsonMarshallingResponseInStructuralType() throws JsonParseException, JsonMappingException, IOException {
		String json = "{\"id\":1,\"address\":\"Calle falsa 123\",\"status\":\"denied\",\"permit_type\":\"residential_structural\",\"resolved_at\":\"2018-01-26T06:43:46.859Z\",\"created_at\":\"2018-01-26T05:44:46.796Z\",\"updated_at\":\"2018-01-26T06:43:46.861Z\"}";
		PermitRequest permitRequest = mapper.readValue(json, PermitRequest.class);
		assertEquals(PermitRequest.PermitType.RESIDENTIAL_STRUCTURAL, permitRequest.getPermitType());
	}
}
