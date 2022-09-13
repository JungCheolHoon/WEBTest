<%@page pageEncoding="UTF-8"%>
<%
	String responseText = request.getParameter("responseText");
	
	int engTotal = 0;
	int mathTotal = 0;
	int[] stdTotal = { 0, 0, 0 };
	int[] avg = new int[3];
	int[] grade = { 1, 1, 1 };
	
	for (int i = 0; i < responseText.split(",").length; i++) {
		if (i % 3 == 1) {
			engTotal += Integer.parseInt(responseText.split(",")[i]);
		} else if (i % 3 == 2) {
			mathTotal += Integer.parseInt(responseText.split(",")[i]);
		} else if (i % 3 == 0) {
			stdTotal[i / 3] = Integer.parseInt(responseText.split(",")[i + 1])
			+ Integer.parseInt(responseText.split(",")[i + 2]);
			avg[i / 3] = stdTotal[i / 3] / 2;
		}
	}
	for (int i = 0; i < avg.length; i++) {
		for (int j = i + 1; j < avg.length; j++) {
			if (avg[i] < avg[j]) {
		grade[i]++;
			} else {
		grade[j]++;
			}
		}
	}
	
	out.print(engTotal + "," + mathTotal + "," + stdTotal[0] + "," + stdTotal[1] + "," + stdTotal[2] + "," + avg[0] + ","
			+ avg[1] + "," + avg[2] + "," + grade[0] + "," + grade[1] + "," + grade[2]);
%>